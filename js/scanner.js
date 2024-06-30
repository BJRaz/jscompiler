var types = require("./types");
var debug = false;

function printDebug(str) {
	if(debug)
		console.log(str);
}

function scan(exp, setdebug = false) {
    debug = setdebug;
    let tokens = [];
    let i = 0;
    exp = exp.replace(/\s/g, '');   // remove whitespace from expression   
    let c = exp[i];                 // gets the first character from expression
    
    let numberchars = [];
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
                    tokens.push(new types.Token(types.tTokens.NUMBER, numberchars.join('')));
                    numberchars = [];   // clear the array
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
                        
                        printDebug("[" + c + 
                            "] operator is unary");

                        // let chars = [];
                        // chars.push(c);    

                        numberchars.push(c);    // push the operator to the numbers array

                        // c = exp[++i];
                        // // numeral
                        // let done = false;
                        // let hasdot = c === '.';
                        // while(!done) {
                        //     c = exp[++i];
                        //     switch(c) {
                        //         case '0': case '1': case '2': case '3': case '4':
                        //         case '5': case '6': case '7': case '8': case '9':
                        //             {
                        //                 chars.push(c);
                        //                 break;
                        //             }
                        //         case ".":
                        //             {
                        //                 if(hasdot)
                        //                     throw new Error("Unaccepted character: '" + c + "', at index: " + i);
                        //                 hasdot = !hasdot;
                        //                 chars.push(c);
                        //                 break;
                        //             }
                        //         default:
                        //             {
                        //                 done = true;
                        //                 break;
                        //             }
                        //     }	
                        // }
                        // tokens.push(new types.Token(types.tTokens.NUMBER, chars.join(''))); 
                    } else {
                        tokens.push(new types.Token(types.tTokens.OPERATOR, c)); 
                    }
                    break;
                }					
            case '(':
                {
                    tokens.push(new types.Token(types.tTokens.PARASTART, c)); 
                    break;
                } 
            case ')':
                {
                    tokens.push(new types.Token(types.tTokens.PARAEND, c)); 
                    break;
                }
            default:
                throw new Error("Unaccepted character: '" + c + "', at index: " + i + " " + exp[i]);
        }
        c = exp[++i];
    }
    return tokens;
}

module.exports = { scan: scan }