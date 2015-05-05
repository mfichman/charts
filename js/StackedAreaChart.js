var StackedAreaChart = React.createClass({
  getDefaultProps() {
    return {
      'width': 800,
      'height': 600,
    }
  },

  render: function() {
    var data = this.props.data;
    // Scales x to the width of the SVG component
    //var x = d3.time.scale().range([0, this.props.width]);
    var x = d3.scale.linear().range([0, this.props.width]);
    var y = d3.scale.linear().range([this.props.height, 0]);

    // Computes x, y, and y0 for each data point in each series
    var stack = d3.layout.stack().values(function(d) { return d.value; });
    
    // Array of data-series
    var series = stack(data);

    // Create an SVG path area from the computed x, y, and y0 
    var area = d3.svg.area()
      .x(function(d) { return x(d.time); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0+d.y); });

    // Scale the x-axis
    x.domain(data.reduce(function(d1, d2) {
      var e1 = d3.extent(d1.value, function(d) { return d.time; });
      var e2 = d3.extent(d2.value, function(d) { return d.time; }); 
      e1.concat(e2);
      return d3.extent(e1);
    }));

    // Color for each data series
    var color = d3.scale.category20();

    // Compute the <path> svg elements
    var paths = stack(data).map(function(d) {
      return (
        <g key={d.name}><path d={area(d.value)} fill={color(d.name)}/></g>
      ); 
    });

    return (
      <svg width={this.props.width} height={this.props.height}>
        {paths}
      </svg>
    );
  }
});

