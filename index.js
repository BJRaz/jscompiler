var scanner = require("./js/scanner")
var parser = require("./js/parser");
function main() {
    let expression = "-2*(-2/-100)-100";

		
    parser.parse(expression);
}

main();