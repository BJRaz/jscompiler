const scanner = require("./js/scanner2")
const parser = require("./js/parser");
const rdp = require('./js/recursive_descent_parser');

function main() {
    let expression = "-2*(-2/-100)-100";

    // scanner.scan(expression, true);
    // // let token = null;
    // // while((token = scanner.nextToken()) != null)
    // //     console.log(token);
	// // //return;
    // var result = parser.parse(expression, true);
    // console.log("Result: " + result);

    console.log("Result Recursive Descent Parser: " + expression + "=" + rdp.parse(expression, true));

}

main();