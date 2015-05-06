
var ChartHighlight = React.createClass({
  // Render a highlight for part of a chart.
  render: function() {
    var scale = this.props.scale;
    var height = this.props.height;
    var min = this.props.range[0]*scale.range()[1];
    var max = this.props.range[1]*scale.range()[1];
    var width = max-min;
    return <rect x={min} className='highlight' height={height} width={width}/>
  }
});

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

  var parseDate = function(d) {
    // Parse a Python-style date with fractional seconds
    return new Date(d*1000);  
  };
  
  var timeDomain = function(data, defaultDomain) {
    // Compute the time domain by parsing the domain data as a Date
    if(defaultDomain=='auto') {
      return domain(data, function(d) {
         return parseDate(d.time);
      });
    } else {
      return defaultDomain;
    }
  };
  
  var valueDomain = function(data, defaultDomain, accessor) {
    // Compute the value domain extents
    if(defaultDomain=='auto') {
      var d = domain(data, accessor);
      // Scale by 1.2 so that the maximum value isn't touching the very top of
      // the chart -- i.e., leave some headeroom.
      return [0, d[1]*1.2];
    } else {
      return defaultDomain;
    } 
  };


  return {
    domain: domain,
    timeDomain: timeDomain,
    valueDomain: valueDomain,
    parseDate: parseDate,
  }
})()
