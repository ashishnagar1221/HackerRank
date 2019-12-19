var count = {};

function countingSort(array) {
    for (var i = 0; i < array.length; i++) {
        count[array[i].key] = (count[array[i].key]) ? count[array[i].key] + 1 : 1;
    }

    var total = 0;
    for (var key in count) {
        var oldCount = count[key];
        count[key] = total;
        total += oldCount;
    }

    var output = array.slice(0);

    for (var i = 0; i < array.length; i++) {
        output[count[array[i].key]] = array[i];
        count[array[i].key]++;
    }

    return output;
}

function parse(input) {
    var lines = input.split("\n");
    var numElements = parseInt(lines[0]);
    lines = lines.slice(1);
    var array = lines.map(function (v) {
        return v.split(" ");
    }).map(function (v, i) {
        return {key: v[0], value: v[1], originalIndex: i};
    });

    var sorted = countingSort(array);
    for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].originalIndex < sorted.length / 2) {
            output("- ");
        }
        else {
            output(sorted[i].value + " ");
        }
    }
};

var string = "";
function output(str) {
    //string += str;
    process.stdout.write(str);
}

//parse("20\n1 a\n2 b\n1 c\n2 d");
//console.log(string);

function processData(input) {
    //Enter your code here
    parse(input);
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
