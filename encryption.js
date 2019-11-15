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

// Complete the encryption function below.
function encryption(input) {
    var w = Math.floor(Math.sqrt(input.length));
    var h = Math.ceil(Math.sqrt(input.length));
    var a = new Array();
    for(var i=0;i!=h;++i)
        a[i]="";
    for(var i=0;i!=input.length;++i)
    {
        a[i%h]+=input[i];
    }
    var r="";
    for(var i=0;i!=a.length;++i)
    {
        r += a[i] + " ";
    }
    return r;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
