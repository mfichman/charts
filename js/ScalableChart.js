


var ScalableChart = React.createClass({
  // Renders a chart with sliders that are used to control the visible area of
  // the chart.
  getInitialState: function() {
    return {
      'slider0': 0,
      'slider1': 1000,
      'minTime': (function() {
        var date = new Date();
        date.setHours(date.getHours()-1);
        return date;
      })()
    }
  },

  onMonth: function(evt) {
    var date = new Date();
    date.setMonth(date.getMonth()-1);
    this.setState({minTime: date});
  },

  onWeek: function(evt) {
    var date = new Date();
    date.setDate(date.getDate()-7);
    this.setState({minTime: date});
  },

  onDay: function(evt) {
    var date = new Date();
    date.setDate(date.getDate()-1);
    this.setState({minTime: date});
  },

  onHour: function(evt) {
    var date = new Date();
    date.setHours(date.getHours()-1);
    this.setState({minTime: date});
  },

  onMin: function(evt) {
    var date = new Date();
    date.setMinutes(date.getMinutes()-5);
    this.setState({minTime: date});
  },

  onSlider0Change: function(evt) {
    this.setState({slider0: evt.target.value});
  },

  onSlider1Change: function(evt) {
    this.setState({slider1: evt.target.value});
  },

  render: function() {

    // Compute the range of the graph that is visible given the position of the sliders.
    var range = 1000;

    var sliderMin = Math.min(this.state.slider0, this.state.slider1)/range;
    var sliderMax = Math.max(this.state.slider0, this.state.slider1)/range;

    // Filter dates older than the requested range.
    var minTime = this.state.minTime;
    var data = this.props.data.map(function(d) {
      return {
        'name': d.name,
        'value': d.value.filter(function(d) {
          var date = ChartUtil.parseDate(d.time);
          return date>=minTime;
        })
      }
    });

    var domain = ChartUtil.domain(data, function(d) {
      return d.time;
    });
    var min = domain[0];
    var max = domain[1];

    domain[0] = ChartUtil.parseDate(min+(max-min)*sliderMin);
    domain[1] = ChartUtil.parseDate(min+(max-min)*sliderMax);


    // Create the main chart, which shows only the highlighted subset of data
    // in the display.
    var chart = React.createElement(this.props.kind, {
      ydomain: this.props.domain,
      xdomain: domain,
      units: this.props.units,
      data: data,
      height: 400,
    });

    // Create the mini chart, which shows all the data.
    var mini = React.createElement(this.props.kind, {
      ydomain: this.props.domain,
      highlight: [sliderMin, sliderMax],
      data: data,
      height: 100,
    });

    return (
      <div className='chart'>
        <ButtonToolbar small className='pull-right'>
          <Button onClick={this.onMonth} bsSize='small'>MONTH</Button>
          <Button onClick={this.onWeek} bsSize='small'>WEEK</Button>
          <Button onClick={this.onDay} bsSize='small'>DAY</Button>
          <Button onClick={this.onHour} bsSize='small'>HOUR</Button>
          <Button onClick={this.onMin} bsSize='small'>5 MIN</Button>
        </ButtonToolbar>
        <h1>{this.props.title}</h1>
        {chart}
        {mini}
        <input refs='slider0' onChange={this.onSlider0Change} type='range' min='0' max={range} defaultValue={this.state.slider0}/>
        <input refs='slider1' onChange={this.onSlider1Change} type='range' min='0' max={range} defaultValue={this.state.slider1}/>
      </div>
    );
  }
});

