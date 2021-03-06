const Group = require('./Group');
class Groups {
    constructor() {
        this.groups = [];
    }

    printGroupAndUsers() {
        for (var i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getName());
            this.groups[i].printAllUsers();
        }
    }

    updateAge(username, age) {
        for (var i = 0; i < this.groups.length; i++) {
            this.groups[i].updateAge(username, age);
        }
    }

    addUserToGroup(username, age, groupName) {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getName() === groupName) {
                if (this.groups[i].checkIfExist(username)) {
                    console.log("The username is already exist in the same group!");
                } else {
                    this.groups[i].setUsersOfGroup(username, age);
                    console.log('The username added to the group\n');
                }
                break;
            }
        }
    }

    removeUserFromGroup(username, groupName) {
        if (groupName !== 'allGroups') {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].getName() === groupName) {
                    if (this.groups[i].removeUser(username)) {
                        console.log('the name removed from the group\n');
                    } else {
                        console.log("The username doesn't exist in this group!!");
                    }
                    break;
                }
            }
        } else {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].removeUser(username)) {
                    console.log('the name removed from the group\n');
                }
            }
        }
    }


    checkIfExist(name) {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getName() === name) {
                return true;
            }
        }
    }

    getName(i) {
        return this.groups[i].getName();
    }

    getLength(group) {
        return this.groups.length;
    }

    addGroup(nameOfGroup) {
        var group = new Group(nameOfGroup);
        var flag = 0;
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getName() === group.getGroupName()) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.groups.push(group);
            console.log('The group created\n');
        } else {
            console.log("The group is already exist!");
        }

    }

    removeGroup(group) {
        var flag = 0;
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getName() === group) {
                flag = 1;
                this.groups.splice(i, 1);
                console.log('the group removed\n');
                break;
            }
        }
        if (flag === 0) {
            console.log("The group doesn't exist!!");
        }
    }

    print() {
        if (this.groups.length) {
            for (var i = 0; i < this.groups.length; i++) {
                console.log(this.groups[i].getName());
            }
        } else {
            console.log("There is no existing group\n");
        }
    }
}
module.exports = Groups;