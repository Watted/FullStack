const user = require('./User');
function Users() {
    this.users = [];
}

Users.prototype.addUser = function(user) {
    var flag=0;
    for (var i = 0 ; i< this.users.length;i++){
        if (this.users[i].getUsername() === user.getUsername()){
            flag = 1;
        }
    }
    if (flag===0) {
        this.users.push(user);
        console.log('user created\n');
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
            console.log('the user removed\n');
            break;
        }
    }
    if(flag===0){
        console.log("The Username doesn't exist!!");
    }
};

Users.prototype.print = function() {
    for (var i = 0; i<this.users.length;i++){
        console.log(this.users[i].getUsername());
    }
};


module.exports = Users;