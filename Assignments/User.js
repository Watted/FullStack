function User(username,password,age) {
    //private property
    this.username = username;
    this.password = password;
    this.age = age;
}
User.prototype.getUsername = function () {
    return this.username;
};



module.exports = User;





/*//private methods
function createUser(username,password,age) {
    username =  username;
    password = password;
    age = age;
}*/
