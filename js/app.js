var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Panel = ReactBootstrap.Panel;

var AggregateView = React.createClass({
  // Shows resource usage as an aggregate.
  render: function() {
    // FIXME: Extract cluster-aggregate data and pass to the scalable chart.
    var data = this.props.data;
    var chart = React.createElement(this.props.chartType, {data: data});

    // data.hostResourceUsage.map({
    // });

    return (
      <Row><Col xs={12}><Panel>{chart}</Panel></Col></Row>
    )
  }
});

var HostGridView = React.createClass({
  // Shows the resource usage of each host as a grid of individual charts, one
  // per host.
  render: function() {
    return (<Row/>);
  }
});

var HostView = React.createClass({
  // Shows resource usage of all tasks for a host, stacked.
  render: function() {
    return (<Row/>);
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      'sidebarButton': ['CPU','MEM','NET','ERR','EVT','LOG'],
      'viewType': AggregateView,
      'chartType': CpuUsageChart,
    }
  },

  onSidebarButtonClick: function(name) {
    // User clicked the chart sidebar button. Decide which kind of chart to
    // show, and update it.
    var chartType = this.state.chartType;
    if(name=='CPU') {
      chartType = CpuUsageChart;
    } else if(name=='MEM') {
      chartType = MemoryUsageChart;
    } else if(name=='NET') {
      chartType = NetUsageChart;
    } else if(name=='ERR') {
    } else if(name=='EVT') {
    } else if(name=='LOG') {
    } else {
    }
    this.setState({'chartType': chartType});
  },

  onViewTypeClick: function() {
    // Toggle the view type.
    var viewType
    if(this.state.viewType==AggregateView) {
      viewType = HostGridView;
    } else if(this.state.viewType==HostGridView) {
      viewType = AggregateView;
    }
    this.setState({'viewType': viewType});
  },

  render: function() {
    // Select the view to show, and render it
    var view = React.createElement(this.state.viewType, {
      data: this.props.data,
      chartType: this.state.chartType,
    });

    var sidebarButtons = this.state.sidebarButton.map(function(button) {
      var click = this.onSidebarButtonClick.bind(this, button);
      return (<SidebarButton onClick={click} key={button} text={button}/>);
    }, this);

    var viewTypeText;
    if(this.state.viewType==AggregateView) {
      viewTypeText = 'show per-host statistics';
    } else if(this.state.viewType==HostGridView) {
      viewTypeText = 'show aggregate statistics';
    } else {
    }

    return (
      <div>
        <Navbar brand='Dashboard' fixedTop/>
        <Sidebar>
          <SidebarButton icon='home' className='home-button'/>
          {sidebarButtons}
        </Sidebar>
        <Grid fluid>
          <ButtonToolbar className='pull-right'>
            <Button bsStyle='link' onClick={this.onViewTypeClick}>
                {viewTypeText}
            </Button>
          </ButtonToolbar>
          {view}
        </Grid>
      </div>
    )
  }

});

var render = function(data) {
  var data = $.parseJSON(data);

  React.render(
    <App data={data}/>,
    document.getElementById('content')
  );
}

setInterval(function() {
  $.get('/stats').done(render);
}, 5000);
