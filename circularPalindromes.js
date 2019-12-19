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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the circularPalindromes function below.
 */
function isPalindrome(str) {
    const len = str.length;

    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
};

function subs(s) {
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = 1; j <= s.length - i; j++) {
            const sub = s.substring(i, i + j);

            if (sub.length < 2) continue;

            if (isPalindrome(sub) && sub.length > max) {
                max = sub.length;
            }
        }
    }

    return max;
};

function circularPalindromes(s) {
    if (s !== null && s.length > 1) {
        const input = s.split('');
        const strLen = input.length;
        const strLenM1 = input.length - 1;
        let currlen, equalslen, j1, j2;
        const biggest = new Array(input.length).fill(0);

        for (let i = 0; i < input.length; i++) {
            currlen = 1;
            j1 = (i < 1) ? strLenM1 : i - 1;
            j2 = (i >= strLenM1) ? 0 : i + 1;
            while (input[i] === input[j2] && currlen < strLen) {
                currlen++;
                if (++j2 >= strLen) {
                    j2 = 0;
                }
            }
            equalslen = currlen

            if (currlen > 1) {
                checkBiggestEqual(biggest, i, currlen);
                i += currlen - 1;
            }

            while (input[j1] === input[j2] && currlen < strLen && j1 !== j2) {
                currlen += 2;
                if (--j1 < 0) {
                    j1 = strLenM1;
                }
                if (++j2 >= strLen) {
                    j2 = 0;
                }
            }
            if (currlen > equalslen) {
                if (++j1 >= strLen) {
                    j1 = 0;
                }
                checkBiggest(biggest, j1, currlen, equalslen);
            }
        }
        return biggest;
    }
}

function checkBiggestEqual(biggest, index, len) {
    for (var i = (index - biggest.length + len < 0 ? 0 : index - biggest.length + len); i < index; i++) {
        if (biggest[i] < len) {
            biggest[i] = len;
        }
    }
    for (var i = index + len; i < biggest.length; i++) {
        if (biggest[i] < len) {
            biggest[i] = len;
        }
    }
    const limit = index + len;
    const midle = index + (len >> 1);
    const even = (len & 1) === 0;

    for (let i = index, j = index; i < limit; i++ , j++) {
        if (j >= biggest.length) {
            j = i % biggest.length;
        }
        if (biggest[j] < len) {
            biggest[j] = len;
        }
        if (i < midle) {
            len--;
        } else if (i > midle) {
            len++;
        } else if (even) {
            len++;
        }
    }
}

function checkBiggest(biggest, index, len, equalslen) {
    for (let i = (index - biggest.length + len < 0 ? 0 : index - biggest.length + len); i < index; i++) {
        if (biggest[i] < len) {
            biggest[i] = len;
        }
    }
    for (let i = index + len; i < biggest.length; i++) {
        if (biggest[i] < len) {
            biggest[i] = len;
        }
    }
    const limit1 = index + (len >> 1) - (equalslen >> 1);
    const limit2 = index + len;

    for (let i = index, j = index; i < limit1; i++ , j++) {
        if (j >= biggest.length) {
            j = i % biggest.length;
        }
        if (biggest[j] < len) {
            biggest[j] = len;
        }
        len -= 2;
    }
    for (let i = limit1 + equalslen, j = limit1 + equalslen; i < limit2; i++ , j++) {
        if (j >= biggest.length) {
            j = i % biggest.length;
        }
        if (biggest[j] < len) {
            biggest[j] = len;
        }
        len += 2;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = circularPalindromes(s);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
