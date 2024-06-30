const types = require("./types");
const scanner = require("./scanner2");
const { tTokens } = require("./types");

var stack = [];
var operators = [];
var currenttoken = null;

var debug = false;

// The BNF
// 
// statement 	    ::= 	expression 
// expression	    ::= 	term expression_prime
// expression_prime ::=     [+,/] term expression_prime | e
// term             ::=     factor term_prime
// term_prime       ::=     [*,/] factor term_prime | e 
// factor		    ::=		num | ( expression ) 
// num 			    ::= 	[+|-]{digit}.digit{digit}
// operator		    ::=  	+ | - | * | /
// digit		    ::= 	0 | ... | 9

function match(token) {
	return (currentToken() != null) ? currentToken().token() == token : false;
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

function statement() {
    advance();
    expression();
}

function expression() {
    term();
    expression_prime();
}

function expression_prime() {
    if(match(types.tTokens.PLUSOPERATOR) || match(types.tTokens.MINUSOPERATOR)) {
        operators.push(currentToken().getValue());
        advance();
        term();
        expression_prime();
        doCalc();
    }
}

function term() {
    factor();
    term_prime();
}

function term_prime() {
    if(match(types.tTokens.TIMESOPERATOR) || match(types.tTokens.DIVISIONOPERATOR)) {
        operators.push(currentToken().getValue());
        advance();
        factor();
        term_prime();
        doCalc();
    }
}

function factor() {
    if(match(tTokens.NUMBER)) {
		stack.push(parseFloat(currentToken().getValue()));
        advance();
	}
    else if(match(types.tTokens.LEFTP))
    {
        advance();
        expression();
        if(match(types.tTokens.RIGHTP))
            advance();
        else
            throw new Error('Unmatched "("');
        doCalc();
    } else
        throw new Error('Number exprected...');
    
}

function init() {
	stack = [];
	tokenbuffer = [];
	currentindex = 0;
	next = null;
}

function parseAndEvaluate(expression, setdebug=false) {
	debug = setdebug;
    init();
	scanner.scan(expression, debug);
	statement();
    
	return (stack.pop());
}

// semantic function 
function doCalc() {
    if(operators.length == 0)
        return;
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


function repeat(i) {
	return Array(i + 1).join(' ');
}

function printDebug(str) {
	if(debug)
		console.log(`${repeat(level * 4)} ${str}`);
}

module.exports = {
	parse: parseAndEvaluate
};