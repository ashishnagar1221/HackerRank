process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
    var n_temp = readLine().split(' ');
    var len = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    var rQueen_temp = readLine().split(' ');
    var rq = parseInt(rQueen_temp[0]);
    var cq = parseInt(rQueen_temp[1]);
    
    var s = rq-1;
    var w = cq-1;
    var n = len-rq;
    var e = len-cq;
    
    var sw = Math.min(cq-1, rq-1);
    var se = Math.min(len-cq, rq-1);
    var nw = Math.min(cq-1, len-rq);
    var ne = Math.min(len-cq, len-rq);
    
    for(var a0 = 0; a0 < k; a0++){
        var rObstacle_temp = readLine().split(' ');
        var ro = parseInt(rObstacle_temp[0]);
        var co = parseInt(rObstacle_temp[1]);

        // s
        if(co == cq && ro < rq) {
            s = Math.min(s, Math.abs(rq-ro)-1);
        }
        // n
        else if(co == cq && ro > rq) {
            n = Math.min(n, Math.abs(rq-ro)-1);
        }
        // w
        else if(ro == rq && co < cq) {
            w = Math.min(w, Math.abs(cq-co)-1);
        }
        // e
        else if(ro == rq && co > cq) {
            e = Math.min(e, Math.abs(cq-co)-1);
        }
        
        
        // sw
        else if(ro < rq && co < cq && ((rq-cq) == (ro-co))) {
            sw = Math.min(sw, Math.abs(cq-co)-1);
        }
        // se
        else if(ro < rq && co > cq && ((rq+cq) == (ro+co))) {
            se = Math.min(se, Math.abs(cq-co)-1);
        }
        // nw
        else if(ro > rq && co < cq && ((rq+cq) == (ro+co))) {
            nw = Math.min(nw, Math.abs(cq-co)-1);
        }
        // ne
        else if(ro > rq && co > cq && ((rq-cq) == (ro-co))) {
            ne = Math.min(ne, Math.abs(cq-co)-1);
        }
    }
    
//    console.log(s, sw, w, se, n, nw, e, ne)
    
    console.log(s + sw + w + se + n + nw + e + ne)
}
