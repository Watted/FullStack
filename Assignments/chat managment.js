const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//direction to User.js
const User = require('./User');
const Users = require('./Users');
let users = new Users();

var choice;
main();
function main(){
    if (choice === 0) {
        r1.close();
    }
    r1.question('1) Enter to create a user\n2) Enter to delete a user.\n', (input) => {
        choice = parseInt(input);
        switch (choice) {
            case 0:
                r1.close();
                break;
            case 1:
                createUser();
                break;
            case 2:
                deleteUser();
                break;
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
                            process.exit(1);
                        }
                    });
                }
            });
        }
    });
}


/*
function User(username,password,age) {
    this.username = username;
    this.password = password;
    this.age = age;
}*/

/*ser.prototype.createUser = function () {
    var username,password,age;
    r1.question('input your username: ',(input)=>{
        {
            username = input;
            r1.question('input your password: ',(input)=>{
                {
                    password = input;
                    r1.question('input your age: ',(input)=>{
                        {
                            age = input;
                            return new User(username,password,age);
                        }
                    });
                }
            });
        }
    });


}*/

/*
var Users = [][3];
var choice;
userChoices();
function userChoices() {
    if(choice===0)
    {
        r1.close();
    }
    r1.question('1) Enter to create a user\n2) Enter to delete a user.\n', (input) => {
        choice = parseInt(input);
        switch (choice) {
            case 0:
                r1.close();
                break;
            case 1:
                createUser();
                userChoices();
                break;
            case 2:
                deleteUser();
                break;
            default:
                console.log("Wrong answer, please try again!!");
                break;
        }
    });
}

function deleteUser() {
    var username;
    r1.question('Please enter the username to delete',(input)=>{
        username = input;
        for (var i =0 ;i<Users.length;i++){
            //if (username === Users[i].username){
                Users[i].pop();
                console.log(Users);
            //}
        }

    });
    
}


function createUser() {
    var username,password,age;
    var user = [];
    r1.question('input your username: ',(input)=>{
        {
            user['username'] = input;
            r1.question('input your password: ',(input)=>{
                {
                    user['password'] = input;
                        r1.question('input your age: ',(input)=>{
                            {
                                user['age'] = input;
                                addUser(user);
                                //userChoices();
                            }
                    });
                }
            });
        }
    });

}

function addUser(user) {
    var flag=1;
    for (var i=0; i < Users.length;i++){
        if(Users[i].username=== user['username']){
            flag=0;
        }
    }
    if(flag===1){
        Users.push(user);
    }

}*/

/*
r1.question('input your selection: ',function (input) {
   console.log('i got: ',input);

});*/

//r1.question('input your selection: ',processInput);

/*function processInput1(input) {
    console.log('i got: ', input);
    return input;
}
function processInput2(input) {
    console.log('i got: ', input);
    return input;
}*/