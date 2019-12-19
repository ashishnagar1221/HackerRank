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

// Complete the insertionSort2 function below.
function insertionSort2(n, arr) {
    var arrShow 
    var temp
  for (var i = 1; i < arr.length; i++) 
  {
    if (arr[i] < arr[0]) 
    {
      temp = arr.splice(i,1)[0]
      arr.unshift(temp);
    } 
     
    else {
      for (var j = 1; j < i; j++) {
        if (arr[i] > arr[j-1] && arr[i] < arr[j]) 
        {
          temp = arr.splice(i,1)[0]
          arr.splice(j,0,temp);
        }   
      }
    }   arrShow = arr.join(' ')
        console.log(arrShow)
  }


}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    insertionSort2(n, arr);
}
