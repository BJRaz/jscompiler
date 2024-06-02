var types = require("./types");

var debug = false;
let i = 0;
let c = '';
let tokens = [];
let exp = '';

function printDebug(str) {
	if(debug)
		console.log(str);
}

function scan(expression, setdebug = false) {
    debug = setdebug;
    i = 0;
    exp = expression.replace(/\s/g, '');   // remove whitespace from expression   
    c = exp[i];                             // gets the first character from expression
}

function nextToken() {
    let numberchars = [];
    let token = null;
    while(c) {
        switch(c) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9': 
            case '.':
                {
                    let hasdot = c === '.';
                    numberchars.push(c);
                    // numeral
                    let done = false;
                    while(!done) {
                        c = exp[++i];
                        switch(c) {
                            case '0': case '1': case '2': case '3': case '4':
                            case '5': case '6': case '7': case '8': case '9':
                                {
                                    numberchars.push(c);
                                    break;
                                }
                            case '.':
                                {
                                    if(hasdot)
                                        throw new Error("Unaccepted character: '" + c + "', at index: " + i);
                                    hasdot = !hasdot;
                                    numberchars.push(c);
                                    break;
                                }
                            default:
                                {
                                    done = true;
                                    break;
                                }
                        }	
                    }
                    let result = numberchars.join('')
                    numberchars = [];   // clear the array
                    return new types.Token(types.tTokens.NUMBER, result);
                    continue;           
                }
            case '+':
            case '-':
            case '*':
            case '/':
                {
                    let prev = exp[i-1];
                    if(prev == undefined 
                        || prev == '-' 
                        || prev == '+'
                        || prev == '/' 
                        || prev == '*' 
                        || prev == '(') {
                       
                        numberchars.push(c);    // push the operator to the numbers array

                    } else {
                        token = (new types.Token(types.tTokens.OPERATOR, c));
                        c = exp[++i];
                        return token; 
                    }
                    break;
                }					
            case '(':
                {
                    token = (new types.Token(types.tTokens.PARASTART, c));
                    c = exp[++i];
                    return token; 
                    break;
                } 
            case ')':
                {
                    token = (new types.Token(types.tTokens.PARAEND, c));
                    c = exp[++i];
                    return  token;
                    break;
                }
            default:
                throw new Error("Unaccepted character: '" + c + "', at index: " + i + " " + exp[i]);
        }
        c = exp[++i];
    }
    return null;
}

module.exports = { 
    scan: scan,
    nextToken: nextToken
}