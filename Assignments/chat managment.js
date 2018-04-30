const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//direction to User.js
const Users = require('./Users');
const Groups = require('./Groups');
let users = new Users();
let groups = new Groups();

var choice=1;

menuOptions();

function menuOptions(){
    r1.question('0) Enter to exit\n1) Enter to create a name\n2) Enter to delete a name.\n3) Enter to print the list of users\n' +
        '4) Enter to create a group\n5) Enter to delete a group\n6) Enter to print the list of groups\n' +
        '7) Enter to add name to group\n8) Enter to remove name from group\n9) Enter to print all the users in the groups\n' +
        '10) Enter to update name password and age\n', main);
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
            case 7:
                addUserToGroup();
                break;
            case 8:
                removeUserFromGroup();
                break;
            case 9:
                printGroupUsers();
                break;
            case 10:
                updateUserOption();
                break;
            default:
                console.log("Wrong answer, please try again!!");
                menuOptions();
                break;
        }
    }
}
function updateUserOption() {
    var username,age,password;
    r1.question('input the username that you want to change it: ',updateUser);
    function updateUser(input) {
        username = input;
        if (users.checkIfExist(username)){
            r1.question('input a new password to change it: ', updatePassword);
        }
        else {
            console.log("the name name doesn't exist!\n");
            menuOptions();
        }
    }
    function updatePassword(input) {
        password = input;
        r1.question('input your age: ',updateAge);
    }
    function updateAge(input) {
        age = input;
        users.updateUser(username,password,age);
        groups.updateAge(username,age);
        menuOptions();
    }

}
function printGroupUsers() {
    var length = groups.getLength();
    if (length !== 0) {
        groups.printGroupAndUsers();
    }else{
        console.log("There were no existing groups\n");
    }
    menuOptions();
}

function removeUserFromGroup() {
    var nameOfGroup, username;
    r1.question('input the username to delete: ',removeUser);
    function removeUser(input) {
        username = input;
        if (users.checkIfExist(username)) {
            r1.question('input the group name: ', groupName);
        }else{
            console.log("there was no username like: "+username);
            console.log('please try again\n');
            menuOptions();
        }
    }
    function groupName(input) {
        nameOfGroup = input;
        if (groups.checkIfExist(nameOfGroup)) {
            groups.removeUserFromGroup(username, nameOfGroup);
        }else {
            console.log("there was no group name like: "+ nameOfGroup);
            console.log('please try again\n');
        }
        menuOptions();
    }
}

function addUserToGroup() {
    var nameOfGroup, username;
    r1.question('input the username: ',addUser);
    function addUser(input) {
        username = input;
        if (users.checkIfExist(username)) {
            r1.question('input the group name: ', addGroupName);
        }else{
            console.log("there was no username like: "+username);
            console.log('please try again\n');
            menuOptions();
        }
    }
    function addGroupName(input) {
        nameOfGroup = input;
        if (groups.checkIfExist(nameOfGroup)) {
            groups.addUserToGroup(username, users.getUserAge(username),nameOfGroup);
        }else{
            console.log("there was no group name like: "+ nameOfGroup);
            console.log('please try again\n');
        }
        menuOptions();
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
        groups.addGroup(nameOfGroup);
        menuOptions();
    }
}

function deleteUser() {
    var username;
    r1.question('input the username to delete: ',usernameToDelete);
    function usernameToDelete(input) {
        username = input;
        users.removeUser(username);
        groups.removeUserFromGroup(username,'allGroups');
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
        users.addUser(username, password, age);
        menuOptions();
    }

}




