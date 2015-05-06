
var ScalableChart = React.createClass({
  // Renders a chart with sliders that are used to control the visible area of
  // the chart.
  render: function() {
    var chart = React.createElement(this.props.kind, {
      ydomain: this.props.domain,
      data: this.props.data,
      height: 400,
    });

    var mini = React.createElement(this.props.kind, {
      ydomain: this.props.domain,
      data: this.props.data,
      height: 100,
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        {chart}
        {mini}
      </div>
    );
  }
});

