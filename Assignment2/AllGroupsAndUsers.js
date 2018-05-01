const Node = require('./Node');
const Group = require('./Group');
const User = require('./User');

class AllGroupsAndUsers {
    constructor(){
        this.root = null;
        this.count =0;
    }
    checkIfRootNull(){
        return !this.root?true:false;
    }
    addGroup(nameOfGroup,anotherGroup){
        var group = new Group(nameOfGroup);
        if (this.checkIfRootNull()){
            this.root = new Node(group);
            this.count++;
        } else{
            var tmp = this.SearchForAnotherGroup(group);
        }
    }
    SearchForAnotherGroup(nameOfGroupOrUser){
        var tmp = this.root.getNode(nameOfGroupOrUser);


    }

    printGroup(){
        this.recursve(this.root);
    }
    recursve(tmp){
        if (tmp){
            if (tmp.getGroup()){
                console.log(tmp.getGroup().getGroupName());
            }
            this.recursve(tmp.getNext());
        }
    }

}

module.exports = AllGroupsAndUsers;