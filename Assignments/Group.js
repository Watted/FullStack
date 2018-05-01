class Group {
    constructor(nameOfGroup) {
        this.nameOfGroup = nameOfGroup;
        this.usersOfGroup = [];

    }

    updateAge(username, age) {
        for (var i = 0; i < this.usersOfGroup.length; i++) {
            if (this.usersOfGroup[i].name === username) {
                this.usersOfGroup[i].age = age;
            }
        }
    }
    getGroupName() {
        return this.nameOfGroup;
    }

    setGroupName(name) {
        this.nameOfGroup = name;
    }

    getUsersOfGroup() {
        return this.usersOfGroup;
    }
    getLength() {
        return this.usersOfGroup.length;
    }
    getUser(i) {
        return this.usersOfGroup[i].name;
    }
    setUsersOfGroup(user, age) {
        var tmp = {name: user, age};
        this.usersOfGroup.push(tmp);
    }
    removeUser(user) {
        for (var i = 0; i < this.usersOfGroup.length; i++) {
            if (this.usersOfGroup[i].name === user) {
                this.usersOfGroup.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    printAllUsers() {
        for (var j = 0; j < this.usersOfGroup.length; j++) {
            console.log("\t" + '' + this.usersOfGroup[j].name + ' (' + this.usersOfGroup[j].age + ')');
        }
    }

    checkIfExist(user) {
        for (var i = 0; i < this.usersOfGroup.length; i++) {
            if (this.usersOfGroup[i].name === user) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Group;