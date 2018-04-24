var options = [
    'hummus', //1
    'hamutzim', //2
    'salat', //4
    'chips' //8
];

var bitwiseOptions = {};
var pita = 0;

buildOptions();
console.log(bitwiseOptions);
/*
var bitwiseOptions = {
    'hummus': 1,
    'hamutzim': 2,
    'salat': 4,
    'chips': 8
};
*/

function buildOptions() {
    for (var i=0; i<options.length; i++){
        bitwiseOptions[options[i]] = 1 << i;
    }
}


/*
console.log(is(pita, 'hamutzim')); // false
pita =set(pita,"hamutzim");
console.log(pita);
console.log(is(pita, 'hamutzim')); // true
*/

console.log(is(pita, 'hummus')); // false
pita =set(pita,"hummus");
console.log(pita);
console.log(is(pita, 'hummus')); // true

/*
console.log(is(pita, 'chips')); // false 8
pita = set(pita,"chips");
console.log(pita);
console.log(is(pita, 'chips')); // true
*/



function is(obj, option) {
    if (option === 'hummus'){
        return obj/2 !== 0;
    }else if (option === 'hamutzim'){
        return ;
    }else if (option === 'salat'){
        return ;
    }else if (option === 'chips') {
        return ;
    }else{}



}

function set(obj, option) {
    if (option === 'hummus'){
        return obj += 1<<1;
    }else if (option === 'hamutzim'){
        return obj += 1<<2;
    }else if (option === 'salat'){
        return obj += 1<<3;
    }else if (option === 'chips') {
        return obj += 1<<4;
    }else{}
}