const Groups = require('./Groups');
const Users = require('./Users');
const User = require('./User');
const Group = require('./Group');
const UserToGroup = require('./UserToGroup');


function UserToGroups() {
    this.userToGroup = [];
}

UserToGroups.prototype.printGroupAndUsers = function(groupName){
    var users = [];
    for (var i = 0; i< this.userToGroup.length; i++){
        if (this.userToGroup[i].getGroupName()=== groupName){
            users.push(this.userToGroup[i].getUsername());
        }
    }
    return users;
};

UserToGroups.prototype.addUserToGroup = function(username,groupName) {
    var flag = 0;
    for (var i = 0; i < this.userToGroup.length; i++) {
        if (this.userToGroup[i].getUsername() === username && this.userToGroup[i].getGroupName() === groupName) {
            flag = 1;
        }
    }
    if (flag === 0) {
        this.userToGroup.push(new UserToGroup(username, groupName));
        console.log('The username added to the group\n');
    }
    else {
        console.log("The username is already exist in the same group!");
    }
};
UserToGroups.prototype.removeUserFromGroup = function(username,groupName) {
    var flag = 0;
    for (var i = 0 ; i< this.userToGroup.length;i++){
        if (this.userToGroup[i].getGroupName() === groupName && this.userToGroup[i].getUsername() === username){
            flag=1;
            this.userToGroup.splice(i, 1);
            console.log('the user removed from the group\n');
            break;
        }
    }
    if(flag===0){
        console.log("The username doesn't exist in this group!!");
    }
};

module.exports = UserToGroups;