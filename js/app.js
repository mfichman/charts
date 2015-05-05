
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
    var content = [];
    if(this.props.text) {
      content.push(this.props.text);
    }
    if(this.props.icon) {
      content.push(<ReactBootstrap.Glyphicon glyph={this.props.icon}/>)
    }
    return (
      <li className={this.props.className}><a href='#'>{content}</a></li>
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

var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

(function() {
  'use strict';
  React.render(
    <div>
      <Sidebar>
        <SidebarButton icon='home' className='home-button'/>
        <SidebarButton text='CPU'/>
        <SidebarButton text='MEM'/>
        <SidebarButton text='NET'/>
        <SidebarButton text='ERR'/>
        <SidebarButton text='EVT'/>
        <SidebarButton text='LOG'/>
      </Sidebar>
      <Navbar brand='Dashboard'/>
      <Cell>
        <StackedAreaChart data={data} width='800' height='600'/>
      </Cell>
    </div>,
    document.getElementById('content')
  );
})();


/*
      <Grid>
        <Row>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
          <Col sm={6} md={4}><StackedAreaChart data={data} width='200' height='200'/></Col>
        </Row>
      </Grid>,
*/
