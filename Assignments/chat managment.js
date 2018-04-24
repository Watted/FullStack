const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/*
r1.question('input your selection: ',function (input) {
   console.log('i got: ',input);

});*/

r1.question('input your selection: ',processInput);
function processInput(input) {
    console.log('i got: ', input);
}