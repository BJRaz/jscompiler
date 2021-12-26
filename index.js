var scanner = require("./js/scanner")
var parser = require("./js/parser");
function main() {
    let expression = "(9/2)*(-1   * 2)"; //"-2*(-2/-100)-100";

		
    var result = parser.parse(expression);
    console.log(result);
}

main();