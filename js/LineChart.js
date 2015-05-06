
var LineChart = React.createClass({
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

    // Create a line graph
    var line = d3.svg.line()
      .x(function(d) { return x(d.time); })
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
    x.domain(ChartUtil.domain(data, function(d) {
      return d.time;
    }));

    // Color for each data series
    var color = d3.scale.category10();

    // Compute the <path> svg elements
    var paths = data.map(function(d) {
      return (
         <g key={d.name}><path d={line(d.value)} fill='none' stroke={color(d.name)}/></g>
      );
    });

    return (
      <svg ref='svg' width='100%' height={this.props.height}>
        {paths}
      </svg>
    );
  } 
});
