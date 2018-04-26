function Group(nameOfGroup) {
    this.nameOfGroup = nameOfGroup;
    
}
Group.prototype.getName = function () {
    return this.nameOfGroup;
}