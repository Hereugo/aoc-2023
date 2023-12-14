let fs = require('fs')

var tileMoveSet = {
    '|': [{
        'next': [0, 1],
        'cond': ['|', 'L', 'J'],
    }, {
        'next': [0, -1],
        'cond': ['|', '7', 'F'],
    }],
    '-': [{
        'next': [1, 0],
        'cond': ['-', 'J', '7'],
    }, {
        'next': [-1, 0],
        'cond': ['-', 'L', 'F'],
    }],
    'L': [{
        'next': [0, -1], 
        'cond': ['|', '7', 'F'],
    }, {
        'next': [1, 0],
        'cond': ['-', 'J', '7'],
    }],
    'J': [{
        'next': [-1, 0],
        'cond': ['-', 'L', 'F'],
    }, {
        'next': [0, -1],
        'cond': ['|', '7', 'F'],
    }],
    '7': [{
        'next': [-1, 0],
        'cond': ['-', 'L', 'F'],
    }, {
        'next': [0, 1],
        'cond': ['|', 'L', 'J'],
    }],
    'F': [{
        'next': [0, 1],
        'cond': ['|', 'L', 'J'],
    }, {
        'next': [1, 0],
        'cond': ['-', 'J', '7'],
    }],
};

function dfs(v, prev, startTile, map, was, start) {
    let tile = map[v.x][v.y];
    
    was[v.x][v.y] = true;

    let res = false;

    if (tile == 'S') {
        tile = startTile;
    }

    // console.log('on: ', tile, v);

    for (let move of tileMoveSet[tile]) {
        let u = {
            'x': parseInt(v.x + move.next[1]),
            'y': parseInt(v.y + move.next[0]),
        };        
        
        if (u.x < 0 || u.y < 0 || u.x >= map.length || u.y >= map[0].length) continue;

        let nextTile = map[parseInt(u.x)][parseInt(u.y)];

        // console.log('go', u, nextTile);

        if (nextTile == 'S') {
            nextTile = startTile;
        }

        // console.log(move.cond.includes(nextTile));

        if (move.cond.includes(nextTile)) {        
            if (u.x == prev.x && u.y == prev.y) continue;

            if (u.x == start.x && u.y == start.y) {
                // console.log('Found path for tile ' + tile);
                return true;
            }
            
            if (was[u.x][u.y]) continue;

            res |= dfs(u, v, startTile, map, was, start);
        }
    }

    return res;
}

function inorout(x, y, map, was, start, ansTile) {
    let res = 0;
    q = [];
    for (let i = y; i < map[x].length; i++) {
        let tile = map[x][i];
        if (!was[x][i]) continue;

        if (tile == 'S') {
            tile = ansTile;
        }

        if (tile == 'J' && q[q.length - 1] == 'L') {
            q.pop();
        } else if (tile == '7' && q[q.length - 1] == 'F') {
            q.pop();
        } else if (tile == '|' && q[q.length - 1] == '|') {
            q.pop();
        } else if ('|LF'.includes(tile)) {
            q.push(tile);
        }
    }
    return q.length;
}

(() => {
    let filename = "input.txt";
    
    let map = fs.readFileSync(process.cwd() + "/" + filename).toString().split('\n');
    let was = [ ...Array(map.length) ].map(x => Array(map[0].length).fill(false));
    let start = {
        'x': 0,
        'y': 0,
    }
    
    for (let i in map) {
        for (let j in map[i]) {
            if (map[i][j] == 'S') {
                start = {
                    'x': parseInt(i),
                    'y': parseInt(j)
                };
            }
        }
    }
    
    let ansTile = '';
    ['|', '-', 'L', 'J', '7', 'F'].forEach(tile => {
        was = [ ...Array(map.length) ].map(x => Array(map[0].length).fill(false)); 
        if (dfs(start, start, tile, map, was, start)) {
            ansTile = tile;

            // PART TWO
            // FIGURE OUT IF TILE IS INSIDE OR OUTSIDE???

            debug = [ ...Array(map.length) ].map(x => Array(map[0].length).fill(false));

            let ans = 0;
            for (let i in map) {
                for (let j in map[i]) {
                    debug[i][j] = map[i][j];
                    if (!was[i][j]) {
                        let cnt = inorout(i, j, map, was, start, ansTile);
                        if (cnt % 2 == 1) {
                            ans += 1;
                            debug[i][j] = '#';
                        } else {
                            debug[i][j] = '.';
                        }
                    }
                }
            }

            console.log(debug.map(x => x.join('')).join('\n'));

            console.log("ANS:", ans);
        }
    });

    let q = [];
    q.push(start);
    let been = [ ...Array(map.length) ].map(x => Array(map[0].length).fill(-1));
    been[start.x][start.y] = 0;
    while (q.length > 0) {
        var v = q.shift();
        var tile = map[v.x][v.y];

        if (tile == 'S') {
            tile = ansTile;
        }

        for (let move of tileMoveSet[tile]) {
            let u = {
                'x': v.x + move.next[1],
                'y': v.y + move.next[0],
            };        
            let nextTile = map[u.x][u.y];

            if (nextTile == 'S') {
                nextTile = ansTile;
            }

            if (move.cond.includes(nextTile)) {
                if (been[u.x][u.y] == -1) {
                    been[u.x][u.y] = been[v.x][v.y] + 1;
                    q.push(u);
                }
            }
        }
    }

    let max = 0;
    for (let i in been) {
        for (let j in been[i]) {
            max = Math.max(max, been[i][j]);
        }
    }

    console.log(max);
})();
