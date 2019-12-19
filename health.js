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

// make a tree with nodes like this
// a node takes 5 spaces in the array
// the character of this node
// the index of the sibling or 0 for the last sibling
// the index of the first child or 0 for no children
// the index for the first leaf or 0 for no leaves
// total health it the leaves

// a gene leaf tree node takes up 5 spaces in the array
// the gene number
// index of the right branch
// index of the left branch
// running total of the health
// number of genes in subtree

var tree = [0,0,0,0,0];


function main() {
    var n = parseInt(readLine());
    var genes = readLine().split(' ');
    //var tables = genes.map(make_table);
    var health = readLine().split(' ');
    health = health.map(Number);
    for (var i=0; i<n; i++) {
        var g = genes[i];
        var h = health[i];
        // find g in the tree
        var node = 0;
        for (var j=0; j<g.length; j++) {
            var c = g.charAt(j);
            var create = true;
            var child = tree[node+2];
            while (child > 0) {
                if (tree[child] == c) {
                    //found it
                    create = false;
                    node = child;
                    break;
                } else {
                    child = tree[child+1];
                }
            }
            if (create) {
                //make a child node
                var new_child = tree.length;
                var old_child = tree[node+2];
                tree[node+2] = new_child;
                
                tree.push(c); //character
                tree.push(old_child); //sibling
                tree.push(0); //child
                tree.push(0); //leaf tree
                tree.push(0); //leaf health total
                
                
                node = new_child;
            }
        }
        // add the leave
        // the gene number
        // index of the left branch
        // index of the right branch
        // running total of the health
        // number of genes in subtree
        var new_health = tree[node+4] + h;
        tree[node+4] = new_health;
        
        var new_leaf = tree.length;
        var leaf_node = tree[node+3];
        var leaf_pointer = node+3;
        
        var done = false;
        while (!done) {
            // add the node to this subtree
            if (leaf_node === 0) {
                // add a childless leaf
                tree[leaf_pointer] = new_leaf;
                tree.push(i); // gene number
                tree.push(0); // left branch
                tree.push(0); // right branch
                tree.push(new_health); // running health total
                tree.push(1); // count of nodes in this sub tree
                done = true;
            } else {
                // do we add depth or do we increase the right branch?
                var left = tree[leaf_node+1];
                var left_count = 0;
                if (left > 0) {
                    left_count = tree[left+4];
                }
                var right = tree[leaf_node+2];
                var right_count = 0;
                if (right > 0) {
                    right_count = tree[right+4];
                }
                if (left_count == right_count) {
                    //right tree is full, add depth
                    tree[leaf_pointer] = new_leaf;
                    tree.push(i); // gene number
                    tree.push(leaf_node); // left branch
                    tree.push(0); // right branch
                    tree.push(new_health); // running health total
                    tree.push(left_count+right_count+2); // count of nodes in this sub tree
                    done = true;
                } else {
                    // add this node to the right branch
                    // increase this node's count
                    tree[leaf_node+4]++;
                    // update pointers
                    leaf_pointer = leaf_node+2;
                    leaf_node = right
                    // not done yet
                }
            }
        }
        
        //tree[node+3] = new_leaf;
        //tree.push(i); //gene number
        //tree.push(h); //running health total
        //tree.push(old_leaf); // left branch
        //tree.push(0); // right branch
        //tree.push(1); // count of nodes in this sub tree
    }
    
    //console.error(tree);

    var s = parseInt(readLine());
    var min_score;
    var max_score;
    var first_score = true;
    for(var a0 = 0; a0 < s; a0++){
        var first_temp = readLine().split(' ');
        var first = parseInt(first_temp[0]);
        var last = parseInt(first_temp[1]);
        var d = first_temp[2];
        // your code goes here
        var i = 0;
        var j = 0;
        var node = 0;
        var score_d = 0;
        while (i<d.length) {
            // score starting at i
            while (j<d.length) {
                var c = d.charAt(j);
                // find next node
                var abort = true;
                var child = tree[node+2];
                while (child > 0) {
                    if (tree[child] == c) {
                        //found it
                        abort = false;
                        node = child;
                        j++
                        break;
                    } else {
                        child = tree[child+1];
                    }
                }
                if (abort) {
                    // no genes match
                    break;
                }
                
                // score this node based on the leaf tree
                // the gene number
                // index of the left branch
                // index of the right branch
                // running total of the health
                // number of genes in subtree

                //find the first and last running scores from the leaf tree
                var lo_score = 0;
                // find the largest leaf < first
                var leaf = tree[node+3];               
                while (leaf > 0) {
                    var gi = tree[leaf];
                    if (gi < first) {
                        //this one works, but we might do better on the right branch
                        lo_score = tree[leaf+3];
                        leaf = tree[leaf+2];
                    } else {
                        // this one is too high, but we might find one on the left branch
                        leaf = tree[leaf+1];
                    }
                }
                var hi_score = 0;
                // find the largest leaf <= last
                var leaf = tree[node+3];               
                while (leaf > 0) {
                    var gi = tree[leaf];
                    if (gi <= last) {
                        //this one works, but we might do better on the right branch
                        hi_score = tree[leaf+3];
                        leaf = tree[leaf+2];
                    } else {
                        // this one is too high, but we might find one on the left branch
                        leaf = tree[leaf+1];
                    }
                }
                score_d += hi_score-lo_score;
            }
            // reset
            i++;
            j = i;
            node = 0;
        }
        //var score_d = score(genes.slice(first,last+1),tables.slice(first,last+1),health.slice(first,last+1),d);
        if (first_score) {
            first_score = false;
            min_score = score_d;
            max_score = score_d;
        }
        if (min_score > score_d) {
            min_score = score_d;
        }
        if (max_score < score_d) {
            max_score = score_d;
        }
    }
    console.log([min_score,max_score].join(' '));

}
