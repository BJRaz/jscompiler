var level = 0;
var debug = true;

var Node = function(value) {
    let _value = value;
    
    let left = null;
    let right = null;

    this.getValue = function() {
        return _value;
    }

    this.setLeft = function(node) {
        left = node;
    }

    this.setRight = function(node) {
        right = node;
    }

    this.getLeft = function() {
        return left;
    }

    this.getRight = function() {
        return right;
    }
}

function evaluate(node) {
    var l, r;
    if (node.getLeft())
        l = evaluate(node.getLeft());
    if (node.getRight())
        r = evaluate(node.getRight());
    var v = node.getValue();
    switch (v) {
        case '+':
            {
                return l + r;
            }
        case '-':
            {
                return l - r;
            }
        case '*':
            {
                return l * r;
            }
        case '/':
            {
                return l / r;
            }
    }
    return v;
}


module.exports = {
    Node: Node,
    evaluate: evaluate
}