function processData(input) {
    input = input.split('\n');
    var length = input.length;
    var N, K;
    var buf,j;
    for(var i = 1; i < length; i += 2){
        count = 0;
        buf = input[i].split(" ");
        N = Number(buf[0]);
        K = Number(buf[1]);
        buf = input[i+1].split(" ");
        for(j = 0; j < N; ++j){
            if(Number(buf[j] ) <= 0)
                ++count;
        }
        if(count >= K)
            console.log("NO");
        else
            console.log("YES");
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
