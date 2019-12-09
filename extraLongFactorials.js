function processData(input) {
    //Enter your code here
    var factorial = parseInt(input);
    var array = [1];
    var counter = 2;
    while(counter <= factorial){
        var carry = 0;

        for(var j=0; j<array.length; j++){
            var product = (counter*array[j])+carry;
            
            if(product>99){
                var sep = product.toString().split("").map(function(item){
                    return parseInt(item,10); 
                });
                array[j]=sep[2];
                carry=parseInt(""+sep[0]+sep[1]);
            }  
            else if(product>9){
                var sep = product.toString().split("").map(function(item){
                    return parseInt(item,10); 
                });
                array[j]=sep[1];
                carry=sep[0];
            }
            else{
                array[j]=product;
                carry =0;
            }
        } 
        if(carry!=0){
            var remainder = carry.toString().split("").map(function(item){
               return parseInt(item,10); 
            });
            var k=remainder.length-1
            while(k>=0){
                array.push(remainder[k]);
                k--;
            }
        }
        counter++;   
    }

    var result=""
    for(var l=array.length-1;l>=0;l--){
        result+=array[l];
    }
    process.stdout.write(result);
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
