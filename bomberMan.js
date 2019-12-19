function processData(input) {
    var split = input.split("\n");
    var [R,C,N] = split[0].split(" ");
    var grid = split.slice(1);
    for(var i=0; i<grid.length; i++) {
        grid[i] = grid[i].split("");
    }
    answer(grid, N);
} 
var states = {}, isRepeating = false;
function answer(grid, N) {
    var rowCount = grid.length;
    if(N==1) {
        return print(grid);
    }
    else if(N % 2 == 0) {
        return printFalseGrid(grid);
    }
    else {
        let loopFor= (N-1)/2 ; //times
        for(var i=0; i<loopFor && !isRepeating; i++) {
            grid = transformGrid(grid, (2*i)+3);
        }
        if(isRepeating) {
            for(let prop in states) {
                let val = states[prop];
                if(val.counter >= 2 && (val.N % 4 == N % 4)) {
                    return print(val.grid);
                }
            }
        }
        else {
            print(grid);
        }
    }
}

function transformGrid(initialState, N) {
    var grid = initialState;
    var rowCount = grid.length;
    var colCount = grid[0].length;
    var modifiedGrid = [];
    var stateObj = {
        false: 0,
        true: 0
    }
    for(var i=0; i<rowCount; i++) {
        modifiedGrid.push([]);
        for(var j=0; j<colCount; j++) {
            let cell = grid[i][j];
            modifiedGrid[i].push(cell);
            if(!isCellFalse(grid, i, j)) {
                stateObj.true++;
            }
            if(isCellFalse(grid, i, j)) {
                modifiedGrid[i][j] = ".";
                stateObj.false++;
            }
            else if(!isCellInDangerZone(grid, i, j)) {
                //console.log("i:" + i);
                //console.log("j:" + j);
                modifiedGrid[i][j] = "O";
            }
        }
    }
    var stateString = uniqueStateString(stateObj);
    if(typeof states[stateString] === 'undefined') {
        states[stateString] = {
            counter: 0,
            grid: modifiedGrid,
            N: N
        };
    }
    else {
        states[stateString].counter++;   
    }
    if(states[stateString].counter > 2) {
        isRepeating = true;
    }
    return modifiedGrid;
    
}
function uniqueStateString(stateObj) {
    return stateObj.false+","+stateObj.true
}
function isCellFalse(grid, i, j) {
    return grid[i][j] == "O";
}
function isCellInDangerZone(grid,i,j) {
    if([grid[i][j-1], grid[i][j+1]].indexOf("O") !== -1) return true;
    if(grid[i-1] && grid[i-1][j] == "O") return true;
    if(grid[i+1] && grid[i+1][j] == "O") return true;
}
function printFalseGrid(grid) {
    for(var k=0; k<grid.length; k++) {
        console.log("O".repeat(grid[0].length));
    }
}
function print(grid) {
    for(var i=0; i<grid.length; i++) {
        console.log(grid[i].join(""));
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
