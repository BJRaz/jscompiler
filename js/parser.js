const types = require("./types");
const scanner = require("./scanner");
const { tTokens } = require("./types");

// statement 	::= 	exp 
// exp			::= 	factor operator factor
// factor		::=		( exp ) | NUMBER
// operator		::=  	+ | - | * | /
// NUMBER		::= 	...

var stack = [];

var tokenbuffer = [];

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

function init() {
	stack = [];
	tokenbuffer = [];
	currentindex = 0;
	next = null;
}

function statement() {
	printDebug(level);
	exp();
	printDebug(level);
}

function exp() {
	level++;
	printDebug(level);
	factor();
	operator();
	level--;
}

function factor() {
	printDebug("Factor: " + currentToken().toString());

	if(currentToken().token() == tTokens.NUMBER) {
		stack.push(currentToken().getValue());
	}

	if(currentToken().token() == types.tTokens.PARASTART)
	{
		advance();
		exp();
		if(currentToken().token() != types.tTokens.PARAEND)
			throw new Error('Unmatched "("');
	}	
	
	if(peekNextToken() != undefined) {
		printDebug('Next token: ' + peekNextToken().toString())
		advance();	
	}
	
}

function operator() {
	let token = currentToken();
	
	printDebug("Operator: " + token);
	
	advance();

	if(currentToken().token() == types.tTokens.NUMBER)
	{
		let nexttoken = peekNextToken();
		if(nexttoken != undefined) {
			printDebug('Next token: ' + nexttoken.toString())
			if(nexttoken.tokentype != types.tTokens.PARAEND)
				throw new Error('Unexpected token ' + nexttoken);
			//advance();	
		}
	}
	
	factor();
		
	printDebug("Stack PRE operator: [" + stack + "]");

	switch(token.getValue())
	{
		case '+':
			printDebug("PLUS");
			var op2 = parseFloat(stack.pop());
			var op1 = parseFloat(stack.pop());
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
			throw new Error("Unknown operator " + token.token());
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
	currenttoken = tokenbuffer[++currentindex];
}

/**
 * Get current token from buffer
 * @returns Token
 */
function currentToken() {
	return tokenbuffer[currentindex];
}


function parseAndEvaluate(expression, setdebug=false) {
	debug = setdebug;
	let str = [];
	init();
	tokenbuffer = scanner.scan(expression, debug);
	for(var i in tokenbuffer)
		str[str.length] = tokenbuffer[i].getValue() + ", ";
	str = str.join(' ');
	statement();
	return (stack.pop());
	
}

module.exports = {
	parse: parseAndEvaluate
};

// function beginEvaluate(exp) {
// 	$("#log").html("Starting to Evaluate: " + exp + "<br>");
// 	exp = exp.trim();
// 	stack.push(debth);
// 	var result = evaluate(exp);
// 	stack.pop();
// 	return result;
// }

// function evaluate(exp)
// {
// 	var debth = stack[stack.length-1] + 1;
// 	stack.push(debth);
// 	$("#log").html("(debth: " + (debth) + ") Evaluerer: " + exp + "<br>" + $("#log").html());
	
// 	var len = exp.length;
// 	for(i=0;i<len;i++)
// 	{
// 		var c = exp.charAt(i);
// 		// if(c == '(') {
// 		// 	var left = evaluate(exp.substring(i+1, len));
// 		// 	console.log(left);
// 		// 	stack.pop();
// 		// 	return left;
// 		// }
// 		// if(c == ')') {
// 		// 	var right = evaluate(exp.substring(0, i));
// 		// 	console.log(right);
// 		// 	stack.pop();
// 		// 	return right;
// 		// }
// 		if(c == '+' || c == '-' || c == '*' || c == '/')
// 		{
// 			var left = evaluate(exp.substring(0,i));
			
// 			var right = evaluate(exp.substring(i+1, len));
			
// 			var result = 0;
// 			switch(c)
// 			{
// 				case '+':
// 					result = left + right;
// 					break;
// 				case '-':
// 					result = left - right;
// 					break;
// 				case '*':
// 					result = left * right;
// 					break;
// 				case '/':
// 					result = left / right;
// 					break;
// 			}
// 			stack.pop();
// 			return result;

// 		}
// 	}
// 	stack.pop();
// 	return exp;
// }
