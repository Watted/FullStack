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
    }else{
        console.log("The username is already exist!");
    }

};
Users.prototype.removeUser = function(user) {
    //delete users[user];
};

Users.prototype.print = function() {
    for (var i = 0; i<this.users.length;i++){
        console.log(this.users[i].getUsername())
    }
};


module.exports = Users;