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

// Complete the timeInWords function below.
var words = {1: "one", 2: "two",   3: "three", 4: "four",  5: "five",
         6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
         11: "eleven",   12: "twelve",  13: "thirteen",   14: "fourteen",
         15: "fifteen",  16: "sixteen", 17: "seventeen",  18: "eighteen",
         19: "nineteen", 20: "twenty",  21: "twenty one", 22: "twenty two",
         23: "twenty three", 24: "twenty four",  25: "twenty five",
         26: "twenty six",   27: "twenty seven", 28: "twenty eight",
         29: "twenty nine"}


function timeInWords(h, m) {
var time =""
    if(m == 0)
        time = words[h]+" o' clock"
    else if( m == 30)
        time = "half past "+words[h]
    else if( m < 30){
        if(m == 1)
        time = "one minute past "+words[h]
        else if(m == 15)
        time = "quarter past "+words[h]
        else
            time = words[m]+" minutes past "+words[h]
    }
    else 
    {
        m = 60 - m
        h+=1
        if(m == 1)
            time = "one minutes to "+words[h]
        else if(m == 15)
            time = "quarter to "+words[h]
        else 
            time = words[m]+" minutes to "+words[h]
    }
return time
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
