'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(y) {

 if(y == 1918){
        return ('26.09.' + y)
    }else{
        
        var leapYear = false;
        
        if(y < 1918 && y % 4 == 0){
            leapYear = true;
        }else if(y > 1918 && y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)){
            leapYear = true;
        }
        
        if(leapYear){
           return ('12.09.' + y); 
        }else{
            return('13.09.' + y);
        }
        
        
        
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
