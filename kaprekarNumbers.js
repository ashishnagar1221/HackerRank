function processData(input) {
    //Enter your code here
    input = input.split("\n");
    var sqr = 0;
    var len = 0;
    var halfLen = 0;
    var firstHalf = "";
    var secondHalf = "";
    var arr = [];
    for(var i = parseInt(input[0]); i <= parseInt(input[1]); i++){
        sqr = String(Math.pow(i,2));
        len = String(sqr).length;
        halfLen = Math.floor(len/2);
        firstHalf = halfLen ? sqr.substr(0,halfLen) : 0;
        secondHalf = sqr.substr(halfLen, len);
        if(parseInt(firstHalf)+parseInt(secondHalf) == i){
            arr.push(i);
        }
    }
    if(arr.length){
        console.log(arr.join(" "));
    } else {
        console.log("INVALID RANGE");
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
