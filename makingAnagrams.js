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

// Complete the makingAnagrams function below.
function makingAnagrams(s1, s2) {
    var obj1= new Object();
    var obj2= new Object();
    var arr1= s1.split("");
    for(var i=0; i<arr1.length; i++){
        var occur=1;
        if(i==arr1.length-1){
            occur=1;
        }
        for(var j=i+1; j<arr1.length; j++){
            if(arr1[i]==arr1[j]){
                occur++;
                arr1.splice(j,1);
                j--;
            }            
        }
        obj1[arr1[i]]= occur; 
    }
   
    var arr2= s2.split("");
    for(var i=0; i<arr2.length; i++){
        var occur=1;
        if(i==arr2.length-1){
            occur=1;
        }
        for(var j=i+1; j<arr2.length; j++){
            if(arr2[i]==arr2[j]){
                occur++;
                arr2.splice(j,1);
                j--;
            }            
        }
        obj2[arr2[i]]= occur; 
    }
  
    var del=0;
    for(var prop in obj1){
        if(obj2.hasOwnProperty(prop)){
            del= del+(Math.abs(obj1[prop]-obj2[prop]));
            delete obj2[prop];
        }
        else{
            del= del + obj1[prop];
        }    
    }
    for(var prop in obj2){       
            del= del + obj2[prop];   
    }
    return del;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = makingAnagrams(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
