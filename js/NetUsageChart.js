
var NetUsageChart = React.createClass({
  // Renders CPU usage percent
  render: function() {
    var data = this.props.data;
    var net = ['bytes_sent','bytes_recv'].map(function(name) {
      return {
        'name': name,
        'value': data.map(function(d) {
          return {'time': d.time, 'y': d.system.network[name]};
        }),
      }
    });
    return (
      <ScalableChart title='NETWORK USAGE' ydomain='auto' data={net}/>
    );
  }
});

