
function matString(r,c, matrix) {
  var len = 0;
  if ((r+c)%2 == 0) {
    len = Math.min(r,c)/2;
  }
  else if (r % 2 == 0) {
    len = r/2;
  } else {
    len = c/2;
  }
  
  var result = [];
  var sr = 0;
  var sc = 0;
  var mr = r;
  var mc = c;
  
  for (k=0; k<len; k++) {
    var line = [];
    //console.log(sr +' , ' + sc);
    //console.log(mr +' , ' + mc);
    //console.log(1);console.log(line);
    for(i=sc; i<mc; i++) line.push(matrix[sr][i]);
    //console.log(2); console.log(line);
    for(i=sr+1; i<mr; i++) line.push(matrix[i][mc-1]);
    //console.log(3);console.log(line);
    for(i=mc-1 -1; i>=sc; i--) line.push(matrix[mr-1][i]);
    //console.log(4);console.log(line);
    for(i=mr-1 -1; i>sr; i--) line.push(matrix[i][sc]);
    
     sr = Math.min(sr+1, len); mr = Math.max(len, mr-1);
    sc = Math.min(sc+1, len); mc = Math.max(len, mc-1);
    //console.log(line);
    result.push(line);
  }
  
  //console.log(result);
  return result;
  
}

function stringMat(r,c, mat) {
  var len = 0;
  if ((r+c)%2 == 0) {
    len = Math.min(r,c)/2;
  }
  else if (r % 2 == 0) {
    len = r/2;
  } else {
    len = c/2;
  }

  var matrix = [];
  for(i=0; i<r; i++) {
    var l = [];
    for(j=0; j<c; j++) {
      l.push('');
    }
    matrix.push(l);
  }
  
  var sr = 0;
  var sc = 0;
  var mr = r;
  var mc = c;

  for (k=0; k<len; k++) {
    var line = mat[k];
    var ptr = 0;
    //console.log(sr +' , ' + sc);
    //console.log(mr +' , ' + mc);
    //console.log(1);console.log(line);
    for(i=sc; i<mc; i++) matrix[sr][i] = line[ptr++];
    //console.log(2); console.log(line);
    for(i=sr+1; i<mr; i++) matrix[i][mc-1] = line[ptr++];
    //console.log(3);console.log(line);
    for(i=mc-1 -1; i>=sc; i--) matrix[mr-1][i] = line[ptr++];
    //console.log(4);console.log(line);
    for(i=mr-1 -1; i>sr; i--) matrix[i][sc] = line[ptr++];

    sr = Math.min(sr+1, len); mr = Math.max(len, mr-1);
    sc = Math.min(sc+1, len); mc = Math.max(len, mc-1);

    //result.push(line);
  }

  //console.log(matrix);
  return matrix;

}

function rotStr(r, mat) {
  for (j=0; j<mat.length; j++) {
    var k = r % mat[j].length;
    for(i=0; i<k; i++) {
      //console.log(j)
      var arr = mat[j];
      arr.push(arr.shift());
      mat[j] = arr;
    }
  }
  return mat;
}

function pData(input) {
  var l = 0;
  var line = input[l++].split(' ');
  var r = parseInt(line[0]), c = parseInt(line[1]), rot = parseInt(line[2]);
  var matrix = [];
  for (i=0; i<r; i++) {
    matrix.push(input[l++].split(' '));
  }
  //console.log(matrix);
  var ms = matString(r, c, matrix);
  //console.log(ms);
  rotStr(rot, ms);
  //console.log(ms);
    
  var mr = stringMat(r,c, ms);
  //console.log(mr);
  for(i=0; i<r; i++) {
    console.log(mr[i].join(' '))
  }
}

function processData(input) {
    //Enter your code here
    //console.log(input.split("\n"))
    pData(input.split("\n"));
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
