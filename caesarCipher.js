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

// Complete the caesarCipher function below.
function caesarCipher(s, k) {
   var result = ""
    for(var i = 0;i < s.length; i++){
        var t = s.charAt(i);
        if(/[a-zA-Z]/.test(t)){
            var base = 'a';
            if(t>='A' && t<='Z'){
                base = 'A';
            }
            result += String.fromCharCode(base.charCodeAt() + (t.charCodeAt() - base.charCodeAt() + k)%26);
        }else{
            result += t;
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const k = parseInt(readLine(), 10);

    let result = caesarCipher(s, k);

    ws.write(result + "\n");

    ws.end();
}
