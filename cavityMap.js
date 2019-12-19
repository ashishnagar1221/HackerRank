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

// Complete the cavityMap function below.
function cavityMap(grid) {
for(var i =1;i<(grid.length - 1);i++){
        for(var j=1;j<(grid[i].length - 1);j++){
            if(grid[i-1][j] < grid[i][j]
            && grid[i+1][j] < grid[i][j]
            && grid[i][j-1] < grid[i][j] 
            && grid[i][j+1] < grid[i][j])
                        grid[i][j] = 'X'
        }
}
for(var i=0;i<grid.length;i++){
        grid[i] = grid[i].join('')
    }
return grid
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }
    for(var i=0;i<grid.length;i++){
        grid[i] = grid[i].split('')
    }
    for(var i =0;i<grid.length;i++){
        for(var j=0;j<grid[i].length;j++){
            grid[i][j] = parseInt(grid[i][j])
        }
    }
    let result = cavityMap(grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
