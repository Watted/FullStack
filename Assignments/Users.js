const User = require('./User');
function Users() {
    this.users = [];
}
Users.prototype.updateUser = function(username,password,age) {
    for (var i =0;i<this.users.length;i++){
        if (this.users[i].getUsername()===username)
        {
            this.users[i].setPassword(password);
            this.users[i].setAge(age);
            console.log('Update complete\n');
            break;
        }
    }
};

Users.prototype.checkIfExist = function(username) {
    for (var i =0;i<this.users.length;i++){
        if (this.users[i].getUsername()===username)
        {
            return true;
        }
    }
    return false;
};
Users.prototype.getUserAge = function(user) {
    for (var i =0;i<this.users.length;i++){
        if (this.users[i].getUsername()===user)
        {
            return this.users[i].getAge();
        }
    }
};
Users.prototype.addUser = function(username, password, age) {
    var user = new User(username, password, age);
    var flag=0;
    for (var i = 0 ; i< this.users.length;i++){
        if (this.users[i].getUsername() === user.getUsername()){
            flag = 1;
        }
    }
    if (flag===0) {
        this.users.push(user);
        console.log('name created\n');
    }else{
        console.log("The username is already exist!");
    }

};
Users.prototype.removeUser = function(username) {
    var flag = 0;
    for (var i = 0 ; i< this.users.length;i++){
        if (this.users[i].getUsername() === username){
            flag=1;
            this.users.splice(i, 1);
            console.log('the name removed\n');
            break;
        }
    }
    if(flag===0){
        console.log("The Username doesn't exist!!");
    }
};

Users.prototype.print = function() {
    if (this.users.length) {
        for (var i = 0; i < this.users.length; i++) {
            console.log(this.users[i].getUsername());
        }
    }else{
        console.log("There is not users in the list\n");
    }
};


module.exports = Users;