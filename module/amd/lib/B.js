define(['A'], function(A) {
    const average = function average(...arg) {
        let total = A.sum(...arg);
        return (total/arg.length).toFixed(2);
    };

    return {
        average
    };
});