const types = require("./types");
const scanner = require("./scanner2");
const { tTokens } = require("./types");

// BNF:
// 
// statement 	::= 	expression 
// expression	::= 	factor operator factor
// factor		::=		( expression ) | num
// num 			::= 	[+|-]{digit}.digit{digit}
// operator		::=  	+ | - | * | /
// digit		::= 	0 | ... | 9
//
// issue: This is faulty notation for some productions.
// The parser (almost) handles infix notation, converts it to postfix, and calculates the result. 

var stack = [];
var operators = [];
var tokenbuffer = [];
var currenttoken = null;

var currentindex = 0;
var level = 0;
var debug = false;

function repeat(i) {
	return Array(i + 1).join(' ');
}

function printDebug(str) {
	if(debug)
		console.log(`${repeat(level * 4)} ${str}`);
}

function match(token) {
	return currentToken().token() == token;
}

function init() {
	stack = [];
	tokenbuffer = [];
	currentindex = 0;
	next = null;
}

function statement() {
	printDebug(level);
	advance();
	expression();
	printDebug(level);
}

function expression() {
	level++;
	printDebug(level);
	factor();
	operator();
	factor();
	doCalc();
	level--;
}

function factor() {
	printDebug("Factor: " + currentToken().toString());

	if(match(tTokens.NUMBER)) {
		stack.push(parseFloat(currentToken().getValue()));
	}

	if(match(types.tTokens.LEFTP))
	{
		advance();
		expression();
		if( ! match(types.tTokens.RIGHTP))
			throw new Error('Unmatched "("');
	}	
	
	advance();
}

function operator() {
	operators.push(currentToken().getValue());
	advance();
}

// semantic function 
function doCalc() {
	let theoperator = operators.pop();
	switch(theoperator)
	{
		case '+':
			printDebug("PLUS");
			var op2 = stack.pop();
			var op1 = stack.pop();
			stack.push(op1 + op2);
			break;
		case '-':
			printDebug("MINUS");
			var op2 = stack.pop();
			var op1 = stack.pop();
			stack.push(op1 - op2);
			break;
		case '*':
			printDebug("MULTIPLY");
			stack.push(stack.pop() * stack.pop());
			break;
		case '/':
			printDebug("DIVISION");
			var divisor = stack.pop();
			stack.push(stack.pop() / divisor);
			break;
		default:
			throw new Error("Unknown operator " + theoperator.token());
	}
	
	printDebug("Stack POST operator: [" + stack + "]");
	
}

// *******

/**
 * Get the next token in buffer without advancing the internal bufferindex.
 * @returns Token
 */
function peekNextToken() {
	if(tokenbuffer.length == currentindex)
		throw Error('Index out of bounds');
	return tokenbuffer[currentindex + 1];
}

/**
 * Goto next token in buffer
 */
function advance() {
	currenttoken = scanner.nextToken();
}

/**
 * Get current token from buffer
 * @returns Token
 */
function currentToken() {
	return currenttoken;
}


function parseAndEvaluate(expression, setdebug=false) {
	debug = setdebug;
	let str = [];
	init();
	scanner.scan(expression, debug);
	statement();
	return (stack.pop());
	
}

module.exports = {
	parse: parseAndEvaluate
};
