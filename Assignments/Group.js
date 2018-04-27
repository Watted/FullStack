function Group(nameOfGroup) {
    this.nameOfGroup = nameOfGroup;
    
}
Group.prototype.getGroupName = function () {
    return this.nameOfGroup;
};
Group.prototype.setGroupName = function(name){
    this.nameOfGroup = name;
};

module.exports = Group;