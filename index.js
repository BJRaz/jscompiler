var scanner = require("./js/scanner")
var parser = require("./js/parser");
function main() {
    let expression = "(90-2)*((-2/-100)-100)"; //"-2*(-2/-100)-100";

		
    var result = parser.parse(expression);
    console.log(result);
}

main();