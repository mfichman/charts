
var NetUsageChart = React.createClass({
  // Renders CPU usage percent
  render: function() {
    var bytesToMegabytes = function(d) {
      return d/1000000;
    };

    var data = this.props.data;
    var net = ['bytes_sent','bytes_recv'].map(function(name) {
      return {
        'name': name,
        'value': data.map(function(d) {
          return {
            'time': d.time, 
            'y': bytesToMegabytes(d.system.network[name])
          };
        }),
      }
    });
    return (
      <ScalableChart kind={LineChart} title='NETWORK USAGE' ydomain='auto' units='MB/s' data={net}/>
    );
  }
});

