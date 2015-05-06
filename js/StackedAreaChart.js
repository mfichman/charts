var StackedAreaChart = React.createClass({
  getInitialState : function() {
    return {
      'width': 800,
    }
  },

  getDefaultProps : function() {
    return {
      'height': 600,
      'ydomain': 'auto',
    }
  },

  updateDimensions: function() {
    var width = this.refs.svg.getDOMNode().offsetWidth;
    this.setState({'width': width});
  },

  componentDidMount: function() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateDimensions);
  },

  render: function() {
    // Data must be in the form [{name:..., value:[{time:..., y:...}]}, ...]
    var data = this.props.data;
    var x = d3.scale.linear().range([0, this.state.width]);
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


    // Scale the y-axis
    if(this.props.ydomain=='auto') {
      var yMax = Number.MIN_VALUE;
      data.forEach(function(d) {
        d.value.forEach(function(d) {
          yMax = Math.max(yMax, d.y+d.y0);
        });
      });
      y.domain([0, yMax*1.2]);
    } else {
      y.domain(this.props.ydomain);
    } 

    // Scale the x-axis
    var xMax = Number.MIN_VALUE;
    var xMin = Number.MAX_VALUE;
    data.forEach(function(d) {
      d.value.forEach(function(d) {
        xMax = Math.max(xMax, d.time);
        xMin = Math.min(xMin, d.time);
      });
    });
    x.domain([xMin, xMax]);

    // Color for each data series
    var color = d3.scale.category20();

    // Compute the <path> svg elements
    var paths = stack(data).map(function(d) {
      return (
        <g key={d.name}><path d={area(d.value)} fill={color(d.name)}/></g>
      ); 
    });

    return (
      <svg ref='svg' width='100%' height={this.props.height}>
        {paths}
      </svg>
    );
  }
});

