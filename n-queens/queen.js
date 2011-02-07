/**
 * Created by .
 * User: jpdaigle
 * Date: 11-02-06
 * Time: 2:59 PM
 * To change this template use File | Settings | File Templates.
 */

function write( s ) {
    print (s + "\n");
}

function times(s, n) {
    var sss = [];
    for(var i = 0; i < n; i++) {
        sss.push(s);
    }
    return sss.join("");
}

function prettyPrint(grid) {
    var hline = times("+-", n) + "+";
    var s = hline + "\n";
    for(var x = 0; x < n; x++) {
        for(var y = 0; y < n; y++) {
            if (grid[x] == y) {
                s += "|*";
            } else {
                s += "| ";
            }
        }
        s += "|\n";
        s += hline + "\n";
    }
    write(s);
}


function Reachable(sz) {
    this.sz = sz;
    this.diag_a = [];
    this.diag_b = [];
    this.rowUsed = [];
}

Reachable.prototype.clone = function() {
    var r2 = new Reachable(this.sz);
    r2.diag_a = this.diag_a.slice(0);
    r2.diag_b = this.diag_b.slice(0);
    r2.rowUsed = this.rowUsed.slice(0);
    return r2;
}

Reachable.prototype.placeQueen = function(x, y) {
    this.rowUsed[y] = 1;

    var a = x+y;
    this.diag_a[a] = 1;

    var b = (x-y)+n;
    this.diag_b[b] = 1;
}
Reachable.prototype.testQueen = function(x, y) {
    if (this.rowUsed[y]) return false;
    if (this.diag_a[x + y]) return false;
    if (this.diag_b[x - y + n]) return false;
    return true;
}

Reachable.prototype.toString = function() {
    var s = "{\n";
    s += "diag_a: " + this.diag_a.join() + " \n";
    s += "diag_b: " + this.diag_b.join() + " \n";
    s += "rows  : " + this.rowUsed.join() + " \n";

    s+= "}";
    return s;
}

function doIt(grid, reach, x) {

    // End case: x=n
    if (x===n) {
        return grid;
    }

    for(var y = 0; y < n; y++) {
        // examine chaque rangee
        if (reach.testQueen(x, y)) {

            var loc_reach = reach.clone();
            var loc_grid = grid.slice(0);

            loc_reach.placeQueen(x, y);
            loc_grid[x] = y;

            var ret = doIt(loc_grid, loc_reach, x+1);
            if (ret) return ret; // else continue
        }
    }

    return false;

}

var n;

function solve() {

    for (n = 4; n < 20; n++) {
        write(n + " *****************");
        var grid = [];
        var reach = new Reachable(n);
        var d1 = new Date().getTime();
        var solution = doIt(grid, reach, 0);
        var elapsed = new Date().getTime() - d1;

        prettyPrint(solution);
        write("Elapsed: " + elapsed + " ms");

    }

}

solve();