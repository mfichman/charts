
var LineChart = React.createClass({
  getInitialState: function() {
    return {
      'width': 800,
    }
  },

  getDefaultProps: function() {
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

    // Create a line graph
    var line = d3.svg.line()
      .x(function(d) { return x(ChartUtil.parseDate(d.time)); })
      .y(function(d) { return y(d.y); })

    // Scale the y-axis
    if(this.props.ydomain=='auto') {
      var domain = ChartUtil.domain(data, function(d) {
         return d.y;
      });
      y.domain([0, domain[1]*1.2]);
    } else {
      y.domain(this.props.ydomain);
    } 

    // Scale the x-axis
    x.domain(ChartUtil.timeDomain(data, this.props.xdomain));
    y.domain(ChartUtil.valueDomain(data, this.props.ydomain, function(d) {
      return d.y;
    }));

    // Compute the <path> svg elements
    var paths = data.map(function(d) {
      return (
         <g key={d.name}><path d={line(d.value)} fill='none' stroke={color(d.name)}/></g>
      );
    });

    var valueAxis = '';
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
