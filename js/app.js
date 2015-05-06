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
