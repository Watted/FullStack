const Node = require('./Node');
const Group = require('./Group');
const User = require('./User');

class Tree {
    constructor(rootNode) {
        var node = new Node(rootNode);
        this.root = node;
    }

    traverseDF(callback) {

        // this is a recurse and immediately-invoking function
        (function recurse(currentNode) {
            for (var i = 0, length = currentNode.children.length; i < length; i++) {
                recurse(currentNode.children[i]);
            }

            callback(currentNode);

        })(this.root);


    }
    traverseBF(callback) {
        var queue = new Queue();

        queue.enqueue(this.root);

        currentTree = queue.dequeue();

        while(currentTree){
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.enqueue(currentTree.children[i]);
            }

            callback(currentTree);
            currentTree = queue.dequeue();
        }
    }
    contains(callback, traversal) {
        traversal.call(this, callback);
    }
    add(data, toData, traversal) {
        var child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node.data === toData) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);

        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }
}

module.exports = Tree;