const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


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

}