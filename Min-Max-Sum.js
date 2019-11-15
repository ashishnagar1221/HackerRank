'use strict';

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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    var max = 0
    var min = 0 
    
    arr = arr.sort()
    for(var i =0 ; i< arr.length - 1;i++){
        min+= parseInt(arr[i])
    }
    for(var j = 1; j<arr.length;j++){
        max+= parseInt(arr[j])
    }
    console.log(min, max)
}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
    
}
