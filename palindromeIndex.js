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

// Complete the palindromeIndex function below.
function palindromeIndex(s) {
    var i = 0, j = s.length-1
    var count = -1
    while(i < j){
        if(s[i] != s[j]){
            break
        }i++
        j--
    }
    if(i >= j)
    return count

    var leftPos = i
    var rightPos = j
    var left = true
    var right = true
    while(i < j && (left || right)){
        if(s[i+1] != s[j]){
            left = false
        }
        if(s[i] != s[j-1]){
            right = false
        }

        i++
        j--
    }
return left ? leftPos:right ?rightPos:count

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = palindromeIndex(s);

        ws.write(result + "\n");
    }

    ws.end();
}
