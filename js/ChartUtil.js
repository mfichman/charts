var ChartUtil = (function() {
  'use strict';

  var domain = function(data, accessor) {
    // Computes the min/max values of values for all series in 'data', where
    // data is in the following format:
    // [{value:[....]},...]
    var min = Number.MAX_VALUE;
    var max = Number.MIN_VALUE;
    data.forEach(function(d) {
      d.value.forEach(function(d) {
        max = Math.max(max, accessor(d)); 
        min = Math.min(min, accessor(d));
      });
    });
    return [min, max];
  };

  return {
    domain: domain
  }
})()
