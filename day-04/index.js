let fs = require('fs')

let filename = "input.txt"

let content = fs.readFileSync(process.cwd() + "/" + filename).toString()

let cnt = new Array(content.split("\n").length).fill(1);

let ans = 0;

content.split("\n").forEach((line, i) => {
    let _t = line.split(/(\||\:)/);
    let a = _t[2].split(" ").map(x => parseInt(x)).filter(x => x).sort()
    let b = _t[4].split(" ").map(x => parseInt(x)).filter(x => x).sort()

    let c = a.reduce((p, v, i) => p + (b.find(x => x == v) != undefined), 0);
    
    // PART ONE
    // ans += Math.floor(Math.pow(2, c - 1));

    for (let j = i + 1; j <= i + c; j++) {
        cnt[j] += cnt[i];
    }
});

ans = cnt.reduce((p, v) => p + v, 0);

console.log(ans);