// Recursive Descent Parser 
// v.1.0
// BJR  01-07-2024
// Inspired from Allen Holubs book 'Compiler Design In C', chapter 1
//
// The BNF
// 
// statement 	    ::= 	expression ';' | expression ';' statement
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
const nodes = require('./nodes');

var currenttoken = null;

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
    let node = expression();
    // if (match(tTokens.SEMI))
    //     statement();
    return node;
}

function expression() {
    let l_node = term();
    while (match(tTokens.PLUSOPERATOR) || match(tTokens.MINUSOPERATOR)) {
        const subtree = new nodes.Node(currentToken().getValue());
        advance();
        subtree.setLeft(l_node);
        subtree.setRight(term());
        l_node = subtree;
    }
    return l_node;
}

function term() {
    let l_node = factor();
    while (match(tTokens.TIMESOPERATOR) || match(tTokens.DIVISIONOPERATOR)) {
        const subtree = new nodes.Node(currentToken().getValue());
        advance();
        subtree.setLeft(l_node);
        subtree.setRight(factor());
        l_node = subtree; 
    }
    return l_node;
}

function factor() {
    if (match(tTokens.NUMBER)) {
        let value = parseFloat(currentToken().getValue());
        advance();
        return new nodes.Node(value);
    }
    else if (match(tTokens.LEFTP)) {
        advance();
        const node = expression();
        if (match(tTokens.RIGHTP))
            advance();
        else
            throw new Error('Unmatched "("');
        return node;
    } else
        throw new Error('Number or "(" expected...');
}

function init() {
    stack = [];
    currenttoken = null;
    level = 0;
}

function parseAndEvaluate(expression, setdebug = false) {
    debug = setdebug;
    init();
    scanner.scan(expression, debug);
    const node = statement();
    // if (stack.length > 1)
    //     return stack;
    return nodes.evaluate(node);    //stack.pop();         // should hold one value - the final result
}


function repeat(i) {
    return Array(i + 1).join(' ');
}

function printDebug(str) {
    if (debug)
        console.log(`${repeat(level * 4)} ${str} (${level})`);
}

module.exports = {
    parse: parseAndEvaluate
};