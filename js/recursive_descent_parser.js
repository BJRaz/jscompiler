// Recursive Descent Parser 
// BJR  01-07-2024
// Inspired from Allen Holubs book 'Compiler Design In C', chapter 1
//
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

const scanner = require("./scanner2");
const { tTokens } = require("./types");

var stack = [];
var currenttoken = null;
var debug = false;


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
    /*
        expression_prime -> [+,-] term expression_prime | e
    */
    if(match(tTokens.PLUSOPERATOR) || match(tTokens.MINUSOPERATOR)) {
        var operator = currentToken().getValue();   // get the operator value
        advance();
        term();
        var temp = stack.pop();                     // pop the 'varaible' from the stack added in factor  
                                                    // the varible is not needed anymore      
        switch(operator)
        {
            case '+':
                stack[stack.length-1] += temp;      // do the calculation and store result in stacks top 'variable'.
                break;
            case '-':
                stack[stack.length-1] -= temp;
                break;
        }
        
        expression_prime();
    }
    /* epsilon */
}

function term() {
    factor();
    term_prime();
}

function term_prime() {
    /*
        term_prime -> [*,/] factor term_prime | e
    */
    if(match(tTokens.TIMESOPERATOR) || match(tTokens.DIVISIONOPERATOR)) {
        var operator = currentToken().getValue();   // get the operator value
        advance();
        factor();
        var temp = stack.pop();                     // pop the 'varaible' from the stack added in factor  
                                                    // the varible is not needed anymore      
        switch(operator)            
        {
            case '*':
                stack[stack.length-1] *= temp;      // do the calculation and store result in stacks top 'variable'.
                break;
            case '/':
                stack[stack.length-1] /= temp;
                break;
        }
        term_prime();
    }
    /* epsilon */
}

function factor() {
    if(match(tTokens.NUMBER)) {
		stack.push(parseFloat(currentToken().getValue()));
        advance();
	}
    else if(match(tTokens.LEFTP))
    {
        advance();
        expression();
        if(match(tTokens.RIGHTP))
            advance();
        else
            throw new Error('Unmatched "("');
    } else
        throw new Error('Number exprected...');
    
}

function init() {
	stack = [];
	currenttoken = null;
}

function parseAndEvaluate(expression, setdebug=false) {
	debug = setdebug;
    init();
	scanner.scan(expression, debug);
	statement();
    
	return (stack.pop());
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