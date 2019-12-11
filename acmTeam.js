function processData(input) {
    var _input = input.split("\n"),
        counts = _input.splice(0, 1)[0],
        pepCount = parseInt( counts.split(" ")[0] ),
        topCount = parseInt( counts.split(" ")[1] ),
        maxTeam = 0, 
        maxTopic = 0;
    
    for(var k=0; k<pepCount; k++){
        var prevtopic = _input[k];
        for(var i=k+1; i<pepCount; i++) {
            var curtopic = _input[i],
                topicCount = 0;

            for(var j=0; j<topCount; j++) {
                var a = parseInt(prevtopic.charAt(j));
                var b = parseInt(curtopic.charAt(j));
                if( (a+b)>0 ) {
                    topicCount++;
                }
            }

            if(topicCount > maxTopic) {
                maxTopic = topicCount;
                maxTeam = 1;
            } else if(topicCount == maxTopic) {
                maxTopic = topicCount;
                maxTeam++;
            }
        }
    }

    console.log(maxTopic);
    console.log(maxTeam);
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
