/*
JPDaigle - knight.js
The number of moves is small, we can pre-encode them by hand
BOARD:
1   2   3
4   5   6
7   8   9
    0
*/

// precompute moves
var legalMoves = function() {
	// m[i] = [positions reachable from i]
	// If board was bigger we'd obviously generate this algorithmically!!!
	var m = [];
	m[1] = [6, 8];
	m[2] = [7, 9];
	m[3] = [4, 8];
	m[4] = [3, 9, 0];
	m[5] = [];
	m[6] = [1, 7, 0];
	m[7] = [2, 6];
	m[8] = [1, 3];
	m[9] = [2, 4];
	m[0] = [4, 6];
	return m;
}();

var cache = [];

// Count strings that can be made with 'jumps' moves from position startPos.
function countStrings(startPos, jumps) {
	if (jumps === 0) {
		return 1;
	}
	var targets = legalMoves[startPos];
	var ret = 0;
	for(var i = 0; i < targets.length; i++) {
		var t = targets[i];
		var c = null;
		
		if ( cache[t] && cache[t][jumps-1] ) {
			c = cache[t][jumps-1];
		} else {
			c = countStrings(t, jumps-1);
			cache[t] = cache[t] || [];
			cache[t][jumps-1] = c;
		}	
		ret += c;
	}
	return ret;
}

var time_start = new Date().getTime();
// To find strings of length 10, we execute 9 jumps from our starting position.
print(countStrings(1, 9) + "\n");
print("Elapsed: " + (new Date().getTime()-time_start) + " ms");
