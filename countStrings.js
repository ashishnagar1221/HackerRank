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

function regexTree(regex) {
    let tree = { children: [] },
        nextNode = tree;
    for (let i = 0; i < regex.length; i++) {
        let c = regex[i];
        if (c === "(") {
            nextNode.children.push({
                type: "+",
                parent: nextNode,
                children: []
            });
            nextNode = nextNode.children[nextNode.children.length - 1];
        } else if (c === ")") {
            nextNode = nextNode.parent;
        } else if (c === "|") {
            nextNode.type = "|";
        } else if (c === "*") {
            nextNode.type = "*";
        } else {
            nextNode.children.push({
                type: c,
                parent: nextNode
            });
        }
    }
    return tree.children[0];
}

function walkTree(tree, before, after) {
    before(tree);
    tree.children.forEach(function(child) {
        walkTree(child, before, after);
    });
    after(tree);
}

function printTree(tree) {
    walkTree(tree, function(node) {
        console.log(node.type + '(');
    },
            function() {
        console.log(')');
    });
};

function buildNFA(regex) {
    let tree = regexTree(regex),
        nfa = transform(tree);
    function transform(tree) {
        let nextPiece;
        if (tree.type === "+") {
            nextPiece = concatenation();
        } else if (tree.type === "|") {
            nextPiece = alternation();
        } else if (tree.type === "*") {
            nextPiece = star();
            nextPiece.setInner(transform(tree.children[0]));
        } else {
            nextPiece = node(tree.type);
        }
        if (tree.type === "+" || tree.type === "|") {
            var inner1 = transform(tree.children[0]);
            var inner2 = transform(tree.children[1]);
            nextPiece.setInners(inner1, inner2);
        }

        return nextPiece;
    }
    indexNodes(nfa);
    return convertTreeToList(nfa);
}

function indexNodes(nfa) {
    let nodes = [nfa.head()], idx = 0;
    while (nodes.length !== 0) {
        let next = nodes.pop();
        next.idx = idx++;
        for (let linkType in next.links) {
            next.links[linkType].forEach(function(node) {
                if (!node.idx) {
                    nodes.push(node);
                }
            });
        }
    }
}

function convertTreeToList(nfa) {
    let adjList = {}, 
        nodes = [nfa.head()], 
        visited = [];
    adjList.finite = nfa.finite().idx;
    while(nodes.length !== 0) {
        var nextNode = nodes.pop();
        adjList[nextNode.idx] = {};
        for (var linkType in nextNode.links) {
            adjList[nextNode.idx][linkType] = [];
            nextNode.links[linkType].forEach(function(node) {
                adjList[nextNode.idx][linkType].push(node.idx);
                if (!visited[node.idx]) {
                    nodes.push(node);
                    visited[node.idx] = true;                   
                }
            });
        }
    }
    return adjList;
}

function node(value) {
    let states = [{ links: {}}, { links: {}}];
    states[0].links[value] = [states[1]];
    return {
        head: function() {
            return states[0];
        },
        setNext: function(node) {
            states[1].links = node.links;
        },
        finite: function() {
            return states[1];
        }
    }
};

function star() {
    let states = [],
        n = 4;
    for (let i = 0; i < n; i++) {
        states.push({ links: {} });
    }
    states[0].links['e'] = [states[1], states[3]];
    states[2].links['e'] = [states[1], states[3]];
    return {
        setInner: function(inner) {
            states[1].links = inner.head().links;
            inner.setNext(states[2]);
        },
        head: function() {
            return states[0];
        },
        setNext: function(node) {
            states[n - 1].links = node.links;
        },
        finite: function() {
            return states[n - 1];
        }
    };
}

function concatenation() {
    let head = null,
        finite = null,
        setNextObj = function() {};
    return {
        setInners: function(inner1, inner2) {
            head = inner1.head();
            finite = inner2.finite();
            inner1.setNext(inner2.head());
            setNextObj = inner2.setNext;
        },
        head: function() {
            return head;
        },
        setNext: function(node) {
            setNextObj(node);
        },
        finite: function() {
            return finite;
        }
    };
}

function alternation() {
    let states = [],
        n = 6;
    for (let i = 0; i < n; i++) {
        states.push({ links: {} });
    }
    states[0].links['e'] = [states[1], states[3]];
    states[2].links['e'] = [states[5]];
    states[4].links['e'] = [states[5]];
    return {
        setInners: function(inner1, inner2) {
            states[1].links = inner1.head().links;
            inner1.setNext(states[2]);
            states[3].links = inner2.head().links;
            inner2.setNext(states[4]);
        },
        head: function() {
            return states[0];
        },
        setNext: function(node) {
            states[n - 1].links = node.links;
        },
        finite: function() {
            return states[n - 1];
        }
    };
}

function buildDFA(nfa) {
    let dfa = [],
        i = 0,
        dfaIdxs = {},
        dfaNodeStack = [newNode(new Set([0]))];
    while (dfaNodeStack.length !== 0) {
        let dfaNode = dfaNodeStack.pop(),
            reachableNfaNodes = [];
        dfaNode.nfaNodes.forEach(function(nfaNode) {
            let newReachableNodes = processReachableNfaNode(dfaNode, nfaNode);
            reachableNfaNodes = reachableNfaNodes.concat(newReachableNodes);
        });
        while (reachableNfaNodes.length !== 0) {
            let nfaNode = reachableNfaNodes.pop(),
                newReachableNodes = processReachableNfaNode(dfaNode, nfaNode);
            reachableNfaNodes = reachableNfaNodes.concat(newReachableNodes);
        }
        processLink(dfaNode, 'a');
        processLink(dfaNode, 'b');
        dfa[i] = dfaNode.links;
        dfa[i].finite = dfaNode.finite;
        dfaIdxs[dfaNode.id] = i++;
    }
    replaceIdxs(dfa);
    return dfa;
    
    function processReachableNfaNode(dfaNode, nfaNodeId) {
        let reachableNodes = [],
            links = nfa[nfaNodeId];
        if (nfaNodeId === nfa.finite) {
            dfaNode.finite = true;
        }
        saveLinks(links, 'a', dfaNode);
        saveLinks(links, 'b', dfaNode);
        if (links['e']) {
            links['e'].forEach(function(node) {
                if (!dfaNode.nfaNodes.has(node)) {
                    dfaNode.nfaNodes.add(node);
                    reachableNodes.push(node);
                }
            });
        }
        return reachableNodes;
    }
    
    function newNode(nfaNodeSet, id) {
        if (!id) id = nodeId(nfaNodeSet);
        return {
            nfaNodes: nfaNodeSet,
            links: {},
            id: id
        };
    }
    
    function saveLinks(links, type, dfaNode) {
        if (links[type]) {
            if (!dfaNode.links[type]) {
                dfaNode.links[type] = new Set();
            }
            links[type].forEach(function(node) {
                dfaNode.links[type].add(node);
            });
        }
    }
    
    function processLink(dfaNode, linkType) {
        if (dfaNode.links[linkType]) {
            let newNodeId = nodeId(dfaNode.links[linkType]);
            if (!dfaIdxs[newNodeId]) {
                dfaNodeStack.push(newNode(dfaNode.links[linkType], newNodeId));
            }
            dfaNode.links[linkType] = newNodeId;
        }
    }
    
    function replaceIdxs(dfa) {
        dfa.forEach(function(links) {
            if (links['a']) {
                links['a'] = dfaIdxs[links['a']];
            }
            if (links['b']) {
                links['b'] = dfaIdxs[links['b']];
            }
        });
    }
    
    function nodeId(set) {
        return Array.from(set.values()).sort().join(' ');
    }
}

let nfaFromRegex = buildNFA,
    dfaFromNfa = buildDFA,
    m = 1000000007,
    x = 1000,
    x2 = x * x;

function mod(a, b) {
    let a1 = Math.floor(a / x),
        a2 = a % x,
        b1 = Math.floor(b / x),
        b2 = b % x;
    return ((((a1 * b1) % m) * x2) % m + 
           (((a1 * b2 + a2 * b1) % m) * x) % m +
           (a2 * b2) % m) % m;
}
/*
 * Complete the countStrings function below.
 */
function countStrings(r, l) {
    let dfa = dfaFromNfa(nfaFromRegex(r)),
        adjMatrix = buildAdjMatrix(dfa),
        pathsNum = power(adjMatrix, l),
        res = 0;
    for (let i = 0; i < dfa.length; i++) {
        if (pathsNum[0][i] !== 0 && dfa[i].finite) {
            res = res + pathsNum[0][i];
        }
    }
    return res % m;
}

function buildAdjMatrix(dfa) {
    let matrix = [];
    for (let i = 0; i < dfa.length; i++) {
        let node = dfa[i];
        matrix[i] = [];
        for (let j = 0; j < dfa.length; j++) matrix[i][j] = 0;
        if (node['a']) {
            matrix[i][node['a']] = 1;
        }
        if (node['b']) {
            matrix[i][node['b']] = 1;
        }
    }
    return matrix;
}

function isOdd(num) {
    return num % 2;
}

function power(x, y) {
    if (y == 1) {
        return x;
    }
    if (isOdd(y)) {
        let tmp = power(x, (y - 1) / 2);
        return multiply3(tmp, tmp, x);
    } else {
        let tmp = power(x, y / 2);
        return multiply(tmp, tmp);
    }
}

function multiply3(m1, m2, m3) {
    return multiply(multiply(m1, m2), m3);
}

function multiply(m1, m2) {
    let res = [];
    for (let i = 0; i < m1.length; i++) {
        res[i] = [];
        for (let j = 0; j < m1.length; j++) {
            let sum = 0;
            for (let k = 0; k < m1.length; k++) {
                sum = sum + mod(m1[i][k], m2[k][j]);
            }
            res[i][j] = sum % m;
        }
    }
    return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const rl = readLine().split(' ');

        const r = rl[0];

        const l = parseInt(rl[1], 10);

        let result = countStrings(r, l);

        ws.write(result + "\n");
    }

    ws.end();
}
