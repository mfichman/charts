
var TimeAxis = React.createClass({
  // Renders the time (x) axis of a chart, given the x and y scale objects.
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    var timeFormat = d3.time.format('%-H:%M:%S %p');
    var ticks = x.ticks(3).map(function(tick) {
      var label = timeFormat(tick);
      return (
        <g key={tick} className='tick' transform={'translate('+x(tick)+',0)'}>
          <text dy='.5em' style={{'textAnchor': 'middle'}}>{label}</text>
        </g>
      );
    });
    return (
      <g className='axis' transform={'translate(0,'+(y.range()[0]+10)+')'}>
        {ticks}
      </g>
    );
  }
});

var ValueAxis = React.createClass({
  // Renders the value (y) axis of a chart, given the x and y scale objects.
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    var units = this.props.units;
    var ticks = y.ticks(3).slice(1,3).map(function(tick) {
      return (
        <g key={tick} className='tick' transform={'translate(0,'+y(tick)+')'}>
          <text>{tick+' '+units}</text>
        </g>
      )
    });
    return (
      <g className='axis' transform={'translate('+(x.range()[0])+',0)'}>
        {ticks}
      </g>
    );
  }
});

