var SidebarButton = React.createClass({
  render: function() {
    var icon;
    if(this.props.icon) {
      icon = <ReactBootstrap.Glyphicon glyph={this.props.icon}/>;
    }
    return (
      <li className={this.props.className}>
        <a onClick={this.props.onClick} value={this.props.text} href='#'>
          {this.props.text}
          {icon}
        </a>
      </li>
    );
  }
});

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
});
