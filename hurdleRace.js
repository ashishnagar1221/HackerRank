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

// Complete the hurdleRace function below.
function hurdleRace(k, height) {
    height = height.sort(sortNumber)
    if(height[(height.length) - 1] > k)
    return height[(height.length) - 1] - k
    return 0
}
function sortNumber(a, b) {
  return a - b;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const height = readLine().split(' ').map(heightTemp => parseInt(heightTemp, 10));

    let result = hurdleRace(k, height);

    ws.write(result + "\n");

    ws.end();
}
