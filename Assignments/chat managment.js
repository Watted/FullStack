const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//direction to User.js
const User = require('./User');
const Users = require('./Users');
let users = new Users();

var choice=1;

main();

function main(){
    if (choice === 0) {
        r1.close();
    }
    r1.question('0)Enter to exit\n1) Enter to create a user\n2) Enter to delete a user.\n3) Enter to print the list\n', (input) => {
        choice = parseInt(input);
        switch (choice) {
            case 1:
                createUser();
                break;
            case 2:
                deleteUser();
                break;
            case 3:
                users.print();
            default:
                console.log("Wrong answer, please try again!!");
                break;
        }
    main();
    });
}

function createUser() {
    var username, password, age;
    r1.question('input your username: ', (input) => {
        {
            username = input;
            r1.question('input your password: ', (input) => {
                {
                    password = input;
                    r1.question('input your age: ', (input) => {
                        {
                            age = input;
                            var user = new User(username,password,age);
                            users.addUser(user);
                            users.print();
                            r1.close();
                        }
                    });
                }
            });
        }
    });
}





