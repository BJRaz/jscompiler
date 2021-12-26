var types = require("./types");

function scan(exp) {
    let tokens = [];
    var i = 0;
    exp = exp.replace(/\s/g, '');
    let c = exp[i];
    // remember to remove whitespace    
    
    while(c != undefined) {
        
        switch(c) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                {
                    let numbers = [];
                    numbers.push(c);
                    // numeral
                    let done = false;
                    while(!done) {
                        c = exp[++i];
                        switch(c) {
                            case '0': case '1': case '2': case '3': case '4':
                            case '5': case '6': case '7': case '8': case '9':
                                {
                                    numbers.push(c);
                                    
                                    break;
                                }
                            default:
                                {
                                    done = true;
                                    break;
                                }
                        }	
                    }
                    tokens[tokens.length] = new types.Token(types.tTokens.NUMBER, numbers.join(''));
                    break;
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
                        console.log("Operator is unary");

                        let chars = [];
                        chars.push(c);    // push the operator
                        // numeral
                        let done = false;
                        while(!done) {
                            c = exp[++i];
                            switch(c) {
                                case '0': case '1': case '2': case '3': case '4':
                                case '5': case '6': case '7': case '8': case '9':
                                    {
                                        chars.push(c);
                                        
                                        break;
                                    }
                                default:
                                    {
                                        done = true;
                                        break;
                                    }
                            }	
                        }
                        tokens.push(new types.Token(types.tTokens.NUMBER, chars.join(''))); 
                    } else {
                        tokens.push(new types.Token(types.tTokens.OPERATOR, c)); 
                        c = exp[++i];
                    }
                    
                    break;
                }					
            case '(':
                {
                   
                    tokens.push(new types.Token(types.tTokens.PARASTART, c)); 
                    c = exp[++i];
                    break;
                } 
            case ')':
                {
                    
                    tokens.push(new types.Token(types.tTokens.PARAEND, c)); 
                    c = exp[++i];
                    break;
                }
            default:
                throw new Error("Unknown character: " + c + ", at index: " + i);
        }
    }
    return tokens;
}

module.exports = { scan: scan }