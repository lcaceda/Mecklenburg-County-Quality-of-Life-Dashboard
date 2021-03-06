// sum a metric
function dataSum(dataSet, key, filter) {
    // apply filter if passed
    if (typeof filter !== "undefined" && filter !== null) {
       dataSet = dataFilter(dataSet, filter);
    }

    // reduce dataSet to numbers - no nulls
    dataSet = dataStrip(dataSet, key);

    if (dataSet.length > 0) {
        // calculate
        var total = dataSet.reduce(function(a, b) {
            return a + b;
        });
        return total;
    } else {
        return 'N/A';
    }
}
