test();

function test() {
    try {
        var tree = BTree();

        tree.add(150);
        tree.add(200);
        tree.add(20);
        tree.add(50);
        tree.add(125);
        tree.add(75);
        tree.add(60);
        tree.add(80);

        var itr = tree.search(125);
        assert(itr.value(), 125);

        var expected = [125, 75, 60];
        var actual = [itr.value()];
        while (itr.next()) {
            actual.push(itr.value());
        }

        assertArrayEqual(actual, expected);

        console.log("PASS");
    }
    catch(err){
        console.log("FAIL: " + err);
    }
}

function assertArrayEqual(actual, expected){
    if(actual.length != expected.length){
        throw new Error("Actual length " + actual.length + " does not equal expected length " + expected.length)
    }

    for(var i=0; i<actual.length; i++){
        if(actual[i]!=expected[i]){
            throw new Error("Value at index " + i + " does not match " + actual[i] + " vs. " + expected[i]);
        }
    }
}

function assert(actual, expected) {
    if (actual != expected) {
        throw new Error(message + ". Expected is " + expected + " actual is " + actual);
    }
}

function BTree() {
    var list = {
        node: null,
        right: null,
        left: null ,
        value:0,
        add,
        search,
    };

    function search(valueToFind) {
        //accepts a value and returns a boolean reflecting whether or not the value is contained in the tree.
        function recurse(bst) {
            if (bst.value === valueToFind) {
                itr.node = bst;
            } else if (bst.left !== undefined && valueToFind < bst.value) {
                recurse(bst.left);
            } else if (bst.right !== undefined && valueToFind > bst.value) {
                recurse(bst.right)
            }
        }
        var itr = {
            node:null,
            next,
            value,
        };
        function next(){
            itr.node = itr.node ? itr.node.left : itr.node.right;
            return !!itr.node;
        }

        function value(){
            if(!itr.node){
                throw new Error("No value at current position");
            }

            return itr.node.value;
        }

        recurse(this);
        return itr;
    }


    function add(value) {
        var newNode = {
            right: null,
            left: null,
            value: value,
        }

        function recurse(bst) {
            if (bst.value > value && bst.left === null) {
                bst.left = newNode;
            } else if (bst.value > value) {
                recurse(bst.left);
            } else if (bst.value < value && bst.right === null) {
                bst.right = newNode;
            } else if (bst.value < value) {
                recurse(bst.right);
            }
        }

        recurse(this);

    }

    return list;

}