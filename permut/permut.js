function permut(foo) {
    foo = foo.slice(0); //clone array

    function each(arr, f) {
        for (var i = 0; i < arr.length; i++) {
            f(i, arr[i]); // f invoked with (idx, elem)
        }
    }

    // wrap
    each(foo, function(i, o) {
        foo[i] = {val: o, sortKey: Math.random()};
    });

    // Actually you could probably do the entire permut operation
    // simply in sort by using a random compare, which will do an unstable sort.
    foo.sort(function(a, b) {
        return (a.sortKey < b.sortKey) ? -1 :
                ((a.sortKey === b.sortKey) ? 0 : 1);
    });

    // restore
    each(foo, function(i, o) {
        foo[i] = o.val;
    });
    
    return foo;
}