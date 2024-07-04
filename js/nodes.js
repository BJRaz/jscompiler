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

module.exports = {
    Node: Node
}