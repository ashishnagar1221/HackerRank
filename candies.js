'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the candies function below.
function candies(n, arr) {
    var stuCand = []

    for(i=0;i<n;i++){
        stuCand[i] = 1
    }

    for(var i = 1 ; i < n ; i++){
        if(arr[i] > arr[i-1]){
            stuCand[i]=1 + stuCand[i-1]
        }
    }

    for(i= n-2; i >=0;i--){
        if(arr[i] > arr[i+1]){
            stuCand[i]=stuCand[i] >(1+stuCand[i+1]) ? stuCand[i] :( 1 + stuCand[i+1])
        }
    }

    var sum = stuCand.reduce((pVal,cVal,idx,arr) => pVal+cVal)
    return sum
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
