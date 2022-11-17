const scanner = require("./js/scanner")
const parser = require("./js/parser");

function main() {
    let expression = "9-((8/2)/9)"; //"-2*(-2/-100)-100";

		
    var result = parser.parse(expression);
    console.log(result);
}

main();