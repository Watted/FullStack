const Group = require('./Group');
function Groups() {
    this.groups = [];
}
Groups.prototype.printGroupAndUsers = function(){
    for (var i = 0; i< this.groups.length; i++){
        console.log(this.groups[i].getGroupName());
        this.groups[i].printAllUsers();
    }
};

Groups.prototype.updateAge = function(username,age){
    for (var i = 0; i < this.groups.length; i++) {
        this.groups[i].updateAge(username,age);
    }
};

Groups.prototype.addUserToGroup = function(username,age,groupName) {
    for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].getGroupName() === groupName) {
            if (this.groups[i].checkIfExist(username)){
                console.log("The username is already exist in the same group!");
            }else{
                this.groups[i].setUsersOfGroup(username,age);
                console.log('The username added to the group\n');
            }
            break;
        }
    }
};
Groups.prototype.removeUserFromGroup = function(username,groupName) {
    if (groupName!=='allGroups') {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getGroupName() === groupName) {
                if (this.groups[i].removeUser(username)) {
                    console.log('the name removed from the group\n');
                } else {
                    console.log("The username doesn't exist in this group!!");
                }
                break;
            }
        }
    }else{
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].removeUser(username)) {
                console.log('the name removed from the group\n');
            }
        }
    }
};


Groups.prototype.checkIfExist = function(name) {
    for (var i = 0; i < this.groups.length;i++){
        if (this.groups[i].getGroupName()===name){
            return true;
        }
    }
};
Groups.prototype.getName = function(i) {
    return this.groups[i].getGroupName();
};
Groups.prototype.getLength = function(group) {
    return this.groups.length;
};
Groups.prototype.addGroup = function(nameOfGroup) {
    var group = new Group(nameOfGroup);
    var flag=0;
    for (var i = 0 ; i< this.groups.length;i++){
        if (this.groups[i].getGroupName() === group.getGroupName()){
            flag = 1;
        }
    }
    if (flag===0) {
        this.groups.push(group);
        console.log('The group created\n');
    }else{
        console.log("The group is already exist!");
    }

};

Groups.prototype.removeGroup = function(group) {
    var flag = 0;
    for (var i = 0 ; i< this.groups.length;i++){
        if (this.groups[i].getGroupName() === group){
            flag=1;
            this.groups.splice(i, 1);
            console.log('the group removed\n');
            break;
        }
    }
    if(flag===0){
        console.log("The group doesn't exist!!");
    }
};

Groups.prototype.print = function() {
    if (this.groups.length) {
        for (var i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getGroupName());
        }
    }else {
        console.log("There is no existing group\n");
    }
};

module.exports = Groups;