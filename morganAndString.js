function processData(input) {
    //Enter your code here
      input = input.split("\n");

  for(i=1;i<input.length;i+=2){

    var result = "";
    var first = input[i]+"z";
    var second = input[i+1]+"z";

    while (first.length > 0 && second.length > 0){

          if (first < second) {
          
              result += first.substr(0,1);
              first = first.slice(1,first.length);

          } else {
           
              result += second.substr(0,1);
              second = second.slice(1, second.length);
          }

    } 

    if (first.length === 0) {
      result += second;
    }

    if (second.length === 0){
      result += first;
    }

    console.log(result.slice(0,result.length-2));

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
