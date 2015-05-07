var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;

var Panel = React.createClass({
  render: function() {
    return (
      <div className='cell'>
        {this.props.children}
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState: function() {
    return {
      'activePanel': MemoryUsageChart,
      'sidebarButton': ['CPU','MEM','NET','ERR','EVT','LOG'],
      'panel': {
        'CPU': CpuUsageChart,
        'MEM': MemoryUsageChart,
        'NET': NetUsageChart,
        'ERR': null,
        'EVT': null,
        'LOG': null,
      },
    }
  },

  onClick: function(name) {
    this.setState({'activePanel': this.state.panel[name]});
  },

  render: function() {
    var activePanel = React.createElement(this.state.activePanel, {
      data: this.props.data,
    });

    var sidebarButtons = this.state.sidebarButton.map(function(button) {
      var click = this.onClick.bind(this, button);
      return (<SidebarButton onClick={click} key={button} text={button}/>);
    }, this);

    return (
      <div>
        <Navbar brand='Dashboard' fixedTop/>
        <Sidebar>
          <SidebarButton icon='home' className='home-button'/>
          {sidebarButtons}
        </Sidebar>
        <div id='center'>
          <Panel>{activePanel}</Panel>
        </div>
      </div>
    )
  }

});

var render = function(data) {
  'use strict';

  var data = $.parseJSON(data);

  React.render(
    <App data={data}/>,
    document.getElementById('content')
  );
}


setInterval(function() {
  $.get('/stats').done(render);
}, 5000);
