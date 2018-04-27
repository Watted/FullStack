const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//direction to User.js
const User = require('./User');
const Users = require('./Users');
const Group = require('./Group');
const Groups = require('./Groups');

let users = new Users();
let groups = new Groups();
var choice=1;

menuOptions();

function menuOptions(){
    r1.question('0) Enter to exit\n1) Enter to create a user\n2) Enter to delete a user.\n3) Enter to print the list of users\n' +
        '4) Enter to create a group\n5) Enter to delete a group\n6) Enter to print the list of groups\n', main)
    function main(input){
        choice = parseInt(input);
        switch (choice) {
            case 0:
                process.exit(1);
                break;
            case 1:
                createUser();
                break;
            case 2:
                deleteUser();
                break;
            case 3:
                printUsernames();
                break;
            case 4:
                createGroup();
                break;
            case 5:
                deleteGroup();
                break;
            case 6:
                printGroups();
                break;
            default:
                console.log("Wrong answer, please try again!!");
                menuOptions();
                break;
        }
    }
}

function printGroups() {
    groups.print();
    menuOptions();
}

function deleteGroup() {
    var groupName;
    r1.question('input the group name to delete: ',groupToDelete);
    function groupToDelete(input) {
        groupName = input;
        groups.removeGroup(groupName);
        menuOptions();

    }
}

function createGroup() {
    var nameOfGroup;
    r1.question('input the group name: ', addGroupName);

    function addGroupName(input) {
        nameOfGroup = input;
        var group = new Group(nameOfGroup);
        groups.addGroup(group);
        menuOptions();
    }
}

function deleteUser() {
    var username;
    r1.question('input the username to delete: ',usernameToDelete);
    function usernameToDelete(input) {
        username = input;
        users.removeUser(username);
        menuOptions();

    }
}

function printUsernames() {
    users.print();
    menuOptions();
}
function createUser() {
    var username, password, age;
    r1.question('input your username: ', passwordQuestion);

    function passwordQuestion(input) {
        username = input;
        r1.question('input your password: ', ageQuestion);
    }

    function ageQuestion(input) {
        password = input;
        r1.question('input your age: ', lastThing);
    }

    function lastThing(input) {
        age = input;
        var user = new User(username, password, age);
        users.addUser(user);
        menuOptions();
    }

}




