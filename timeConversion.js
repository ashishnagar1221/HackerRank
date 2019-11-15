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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(time) {
    /*
     * Write your code here.
     */var period = time.slice(-2);
    var hour = time.slice(0,2);
    var military;

    if ( period == 'PM' && hour != '12') {
        var conversion = parseInt(hour) + 12;
        time = time.replace(hour, conversion);
    } else if ( period == 'AM' && hour == '12') {
        time = time.replace(hour,'00');
    }

    military = time.slice(0,-2);
    return military;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
