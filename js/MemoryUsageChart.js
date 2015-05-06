
var MemoryUsageChart = React.createClass({
  // Renders memory usage percent
  render: function() {
    var data = this.props.data;
    var total = 100;
    var memory = ['percent'].map(function(name) {
      return {
        'name': name,
        'value': data.map(function(d) {
          return {'time': d.time, 'y': d.system.memory[name]};
        }),
      }
    });
    return (
      <ScalableChart kind={StackedAreaChart} title='MEMORY USAGE' ydomain={[0, total]} data={memory}/>
    );
  }
});

