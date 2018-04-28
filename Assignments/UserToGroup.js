
function UserToGroup(username,groupName) {
    this.username = username;
    this.groupName = groupName;
}

UserToGroup.prototype.getUsername = function () {
    return this.username;
};

UserToGroup.prototype.getGroupName = function () {
    return this.groupName;
};

module.exports = UserToGroup;