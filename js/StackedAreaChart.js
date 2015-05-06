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
      'xdomain': 'auto',
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
    var yMargin = 40;
    var y = d3.scale.linear().range([this.props.height-yMargin, 0]);
    var x = d3.time.scale().range([0, this.state.width]);
    var color = d3.scale.category10();

    // Computes x, y, and y0 for each data point in each series
    var stack = d3.layout.stack().values(function(d) { return d.value; });
    
    // Array of data-series
    var series = stack(data);

    // Create an SVG path area from the computed x, y, and y0 
    var area = d3.svg.area()
      .x(function(d) { return x(ChartUtil.parseDate(d.time)); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0+d.y); });

    // Scale the axes
    x.domain(ChartUtil.timeDomain(data, this.props.xdomain));
    y.domain(ChartUtil.valueDomain(data, this.props.ydomain, function(d) {
      return d.y+d.y0;
    }));

    // Compute the <path> svg elements
    var paths = stack(data).map(function(d) {
      return (
        <g key={d.name}><path d={area(d.value)} fill={color(d.name)}/></g>
      ); 
    });

    var valueAxis = null;
    if(this.props.units) {
      valueAxis = <ValueAxis x={x} y={y} units={this.props.units}/>
    }

    var highlight = null;
    if(this.props.highlight) {
      highlight = <ChartHighlight 
         height={this.props.height-yMargin} 
         scale={x} 
         range={this.props.highlight}/>
    }

    return (
      <svg ref='svg' width='100%' height={this.props.height}>
        {highlight}
        {paths}
        <TimeAxis x={x} y={y}/>
        {valueAxis}
      </svg>
    );
  }
});


