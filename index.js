const scanner = require("./js/scanner")
const parser = require("./js/parser");

function main() {
    let expression = "2*(-10.5-4)"; //"-2*(-2/-100)-100";

		
    var result = parser.parse(expression, true);
    console.log("Result: " + result);
}

main();