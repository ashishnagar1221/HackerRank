function main(data) {
    var tmp = [], sum = 0, result = [],
        arr = data.split(/[\r\n]/)
        .filter(function(e) {
            return e.trim().search(' ') > 0;
        })
        .map(function(e) {
            return e.split(/\s/).map(function(x) {
                return x - 0;
            });
        });

    function merge_sort(t, lower, upper) {
        if (lower === upper)
            return;

        var i = lower, p = 0,
            index = parseInt(upper / 2 + lower / 2),
            j = index + 1;

        merge_sort(t, lower, index);
        merge_sort(t, index + 1, upper);

        while (i <= index || j <= upper) {
            if (i > index) 
                for (; j <= upper; ++j) 
                    tmp[p++] = t[j];

            if (j > upper) 
                for (; i <= index; ++i) 
                    tmp[p++] = t[i];

            if (t[i] <= t[j])
                tmp[p++] = t[i++];
            else {
                tmp[p++] = t[j++];
                sum += j - p - lower;
            }
        }

        for (p = 0; p <= upper - lower; ++p)
            t[p + lower] = tmp[p];
    }

    arr.forEach(function(t) {
        sum = 0;
        merge_sort(t, 0, t.length - 1);
        result.push(sum);
    });

    return result.join('\n');
}

var data = '';
process.stdin.resume();
process.stdin.setEncoding("ascii");
process.stdin.on("data", function (input) {
    data += input;
});
process.stdin.on('end', function() {
    process.stdout.write(main(data.trim()));
});
