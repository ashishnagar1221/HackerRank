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

function isTri(sides){
    if (sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0]) 
            return true; 
}

function maximumPerimeterTriangle(s) {
    var sides = []
    var side = []
    var valid_tri = []
    s = s.sort(function(a,b){
        return a-b
    })
    
    for(var i = 0;i < s.length-2;i++){
        for(var j = i+1;j<s.length-1;j++){
            for(var k = j+1;k<s.length;k++){
                side = [s[i],s[j],s[k]]
                sides.push(side)
                }
            }    
        }
        for(i = 0; i<sides.length;i++){
            if(isTri(sides[i])){
                valid_tri.push(sides[i])
            }
        }
        if(valid_tri.length === 0)return [-1]
        else return valid_tri[valid_tri.length - 1]
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const sticks = readLine().split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    let result = maximumPerimeterTriangle(sticks);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
