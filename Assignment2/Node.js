const Group = require('./Group');
const User = require('./User');


class Node {
    constructor(groupOrUser){
        this.node = groupOrUser;
        this.parent = null;
        this.children =[];

    }
    addNode(node1) {
       this.next.push(node1);
    }



}

module.exports = Node;