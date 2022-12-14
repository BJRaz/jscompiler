const types = require("./types");
const scanner = require("./scanner");
const { tTokens } = require("./types");

// statement 	::= 	exp 
// exp			::= 	factor operator factor
// factor		::=		( exp ) | NUMBER
// operator		::=  	+ | - | * | /
// NUMBER		::= 	...

var stack = [];

var tokenlist = [];

var currentindex = 0;
var next = null;
var level = 0;

function repeat(i) {
	return Array(i + 1).join(' ');
}

function printDebug(str) {
	console.log(`${repeat(level * 4)} ${str}`);
}

function init() {
	stack = [];
	tokenlist = [];
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
	nextToken();
	if(next != undefined) {
		printDebug('Next token: ' + next.toString())
		
		advance();	
	}
	
}

function operator() {
	var token = currentToken();
	printDebug("Operator: " + token);
	
	advance();
	if(currentToken().token() == types.tTokens.NUMBER)
	{
		nextToken();
		if(next != undefined) {
			printDebug('Next token: ' + next.toString())
			if(next.tokentype != types.tTokens.PARAEND)
				throw new Error('Unexpected token ' + next);
			//advance();	
		}
	}
	
	factor();
		
	printDebug("Stack PRE operator: " + stack);

	switch(token.getValue())
	{
		case '+':
			//printDebug("PLUS");
			var op2 = parseFloat(stack.pop());
			var op1 = parseFloat(stack.pop());
			stack.push(op1 + op2);
			break;
		case '-':
			//printDebug("MINUS");
			var op2 = stack.pop();
			var op1 = stack.pop();
			stack.push(op1 - op2);
			break;
		case '*':
			//printDebug("MULTIPLY");
			stack.push(stack.pop() * stack.pop());
			break;
		case '/':
			//printDebug("DIVISION");
			var divisor = stack.pop();
			stack.push(stack.pop() / divisor);
			break;
		default:
			throw new Error("Unknown operator " + token.token());
	}
	
	printDebug("Stack POST operator: " + stack);
	
}

// *******

function nextToken() {
	if(tokenlist.length == currentindex)
		throw Error('Index out of bounds');
	next = tokenlist[currentindex + 1];
}

function advance() {
	currenttoken = tokenlist[++currentindex];
}

function currentToken() {
	return tokenlist[currentindex];
}


function parseAndEvaluate(expression) {
	init();
	tokenlist = scanner.scan(expression);
	let str = [];
	for(var i in tokenlist)
		str[str.length] = tokenlist[i].getValue() + ", ";
	str = str.join(' ');
	
	console.log("Tokens: " + str);


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
