
var MemoryUsageChart = React.createClass({
  // Renders memory usage percent
  render: function() {
    var bytesToMegabytes = function(d) {
      return d/1000000;
    };

    var data = this.props.data;
    //var total = 100;
    var memory = ['used','free'].map(function(name) {
      return {
        'name': name,
        'value': data.map(function(d) {
          return {
            'time': d.time, 
            'y': bytesToMegabytes(d.system.memory[name])
          };
        }),
      }
    });
    return (
      <ScalableChart kind={StackedAreaChart} title='MEMORY USAGE' units='MB' data={memory}/>
    );
  }
});

