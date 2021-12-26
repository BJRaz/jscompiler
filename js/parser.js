var types = require("./types");
var scanner = require("./scanner");
const { tTokens } = require("./types");

// statement 	:= 	exp 
// exp			:= 	factor operator factor
// factor		:=	( exp ) | NUMBER
// operator		:=  + | - | * | /


var debth = 0;
var stack = [];

var tokenlist = [];

var currenttoken = null;
var currentindex = 0;
var next = null;



function statement() {
	exp();
}

function exp() {
	factor();
	operator();
}

function factor() {
	console.log("Factor: " + currentToken().toString());

	if(currentToken().token() == tTokens.NUMBER) {
		stack.push(currentToken().getValue());
		
	}
		
	nextToken();
	if(next != undefined) {
		console.log('Next token: ' + next.toString())
		if(currentToken().token() == types.tTokens.PARASTART)
		{
			advance();
			exp();
		}
		advance();	
	}
	
}

function operator() {
	var token = currentToken();
	
	advance();
	factor();
		
	switch(token.getValue())
	{
		case '+':
			console.log("PLUS");
			var op2 = parseFloat(stack.pop());
			var op1 = parseFloat(stack.pop());
			stack.push(op1 + op2);
			break;
		case '-':
			console.log("MINUS");
			var op2 = stack.pop();
			var op1 = stack.pop();
			stack.push(op1 - op2);
			break;
		case '*':
			console.log("MULTIPLY");
			stack.push(stack.pop() * stack.pop());
			break;
		case '/':
			console.log("DIVISION");
			var divisor = stack.pop();
			stack.push(stack.pop() / divisor);
			break;
		default:
			throw new Error("Unknown operator " + token.token());
	}
	
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
