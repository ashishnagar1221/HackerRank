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

// Complete the closestNumbers function below.
function closestNumbers(arr) {
    function sortNum(a,b){
        return a - b
    }
    
    arr = arr.sort(sortNum)
    //console.log(arr)
    var newArr = []
    var temp = arr[1] - arr[0]
    for(var i =0; i<arr.length;i++){
        if((arr[i+1] - arr [i]) === temp){
            newArr.push(arr[i])
            newArr.push(arr[i+1])
        }else if((arr[i+1] - arr [i]) < temp){
            newArr = []
            temp = arr[i+1] - arr [i]
            newArr.push(arr[i])
            newArr.push(arr[i+1])
        }
    }
    return newArr

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = closestNumbers(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
