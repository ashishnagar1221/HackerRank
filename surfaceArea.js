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

// Complete the surfaceArea function below.
    function surfaceArea(A) {
    let h = A.length;
    let w = A[0].length;

    let arr = Array(h + 2).fill(null).map(() => Array(w + 2).fill(0));
    
    for (let j = 0; j < h; j++) {
        arr[j + 1] = [0].concat(A[j], 0);
    }

    let area = 0;

    for (let j = 1; j < h + 1; j++) {
        for (let i = 1; i < w + 1; i++) {
            if (arr[j][i] > arr[j][i - 1]) {
                area += arr[j][i] - arr[j][i - 1];
            }

            if (arr[j][i] > arr[j][i + 1]) {
                area += arr[j][i] - arr[j][i + 1];
            }

            if (arr[j][i] > arr[j - 1][i]) {
                area += arr[j][i] - arr[j - 1][i];
            }

            if (arr[j][i] > arr[j + 1][i]) {
                area += arr[j][i] - arr[j + 1][i];
            }

            area += 2;
        }
    }

    return area;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = surfaceArea(A);

    ws.write(result + "\n");

    ws.end();
}
