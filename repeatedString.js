'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the repeatedString function below.
function repeatedString(s, n) {
    s = s.split('');
    let len = s.length
    let c = 0
    for(var i = 0 ; i < len ; i++){
        if( s[i] === 'a'){
            c = c + 1;
        }
    }
    var reps = Math.floor(n/len)
    var rem =n % len

    c = c * reps
    for(var j = 0 ; j < rem ; j++){
        if(s[j] == 'a'){
            c = c + 1
        }
    }
    
return c
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
