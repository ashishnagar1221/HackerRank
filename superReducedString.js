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

// Complete the superReducedString function below.
function superReducedString(s) {
    var arr = s.split('')
    var success = 1;
    var i;
    while(success!=0)
    {
        success = 0;
        for(i=0;i<arr.length-1;i++)
        {
            if(arr[i]==arr[i+1])
            {
                arr.splice(i,2);
                success = 1;
            }
        }
    }
    if(arr.join('').length != 0)
    return arr.join('')
    else
    return "Empty String"

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = superReducedString(s);

    ws.write(result + '\n');

    ws.end();
}
