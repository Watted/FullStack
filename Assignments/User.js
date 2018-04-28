function User(username,password,age) {
    //private property
    this.username = username;
    this.password = password;
    this.age = age;
}
User.prototype.getUsername = function () {
    return this.username;
};

User.prototype.getAge = function () {
    return this.age;
};
User.prototype.setAge = function (age) {
    this.age = age;
};
User.prototype.setPassword = function (password) {
    this.password = password;
};


module.exports = User;





/*//private methods
function createUser(username,password,age) {
    username =  username;
    password = password;
    age = age;
}*/
