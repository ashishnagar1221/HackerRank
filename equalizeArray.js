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

function array(a, b) {
  return a - b;
}
// Complete the equalizeArray function below.
function equalizeArray(arr) {

    arr = arr.sort(array)
        var count = 1; // number of repeatable
        var highest = 0; // highest count
        
        for( var a = 0; a < arr.length -1; a++){
           
            if(arr[a] == arr[a+1]){
                count++; 
                if(count > highest){
                    highest = count;    
                } 
            } else {               
                count= 1;
                continue;   
            }       
        } 
        if (highest == 0){
            return arr.length-1;
        }
        return arr.length - highest;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = equalizeArray(arr);

    ws.write(result + "\n");

    ws.end();
}
