function User() {
    //private property
    var users = '';

    //public properties
    return{
        addUser: addUser
    };

    //private methods
    function addUser(user) {
        users = users + user;
    }



}

module.exports = User;