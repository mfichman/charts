
var data = [
  {
    'name': 'series1',
    'value': [
      {time: 0, y: .1},    
      {time: 1, y: .5},    
      {time: 2, y: .2},    
      {time: 3, y: .1},    
      {time: 4, y: .5},    
      {time: 5, y: .3},    
      {time: 6, y: .3},    
    ]
  },
  {
    'name': 'series2',
    'value': [
      {time: 0, y: .1},    
      {time: 1, y: .3},    
      {time: 2, y: .1},    
      {time: 3, y: .3},    
      {time: 4, y: .1},    
      {time: 5, y: .3},    
      {time: 6, y: .1},    
    ]
  }
];

var SidebarButton = React.createClass({
  render: function() {
    var icon;
    if(this.props.icon) {
      icon = <ReactBootstrap.Glyphicon glyph={this.props.icon}/>;
    }
    return (
      <li className={this.props.className}>
        <a href='#'>
          {this.props.text}
          {icon}
        </a>
      </li>
    );
  }
})

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className='sidebar'>
        <ul className='nav nav-sidebar'>
          {this.props.children}
        </ul>
      </div>
    );
  }
})

var Cell = React.createClass({
  render: function() {
    return (
      <div className='cell'>
        {this.props.children}
      </div>
    )
  }
})

var ScalableChart = React.createClass({
  // Renders a chart with sliders that are used to control the visible area of
  // the chart.
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <StackedAreaChart ydomain={this.props.ydomain} data={this.props.data} height='400'/>
        <StackedAreaChart ydomain={this.props.ydomain} data={this.props.data} height='100'/>
      </div>
    );
  }
});

var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var render = function(data) {
  'use strict';

  var data = $.parseJSON(data);

  React.render(
    <div>
      <Navbar brand='Dashboard' fixedTop/>
      <Sidebar>
        <SidebarButton icon='home' className='home-button'/>
        <SidebarButton text='CPU'/>
        <SidebarButton text='MEM'/>
        <SidebarButton text='NET'/>
        <SidebarButton text='ERR'/>
        <SidebarButton text='EVT'/>
        <SidebarButton text='LOG'/>
      </Sidebar>
      <div id='center'>
        <Cell>
          <NetUsageChart data={data}/>
        </Cell>
      </div>
    </div>,
    document.getElementById('content')
  );
}


setInterval(function() {
  $.get('/stats').done(render);
}, 1000);


/*
      <Grid>
        <Row>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
        </Row>
      </Grid>,
*/
