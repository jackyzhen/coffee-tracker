import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

import css from './styles';
import Header from '../header';
import Footer from '../footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handlePeopleLink = this.handlePeopleLink.bind(this);
    this.handleOutingLink = this.handleOutingLink.bind(this);
  }
  handleTouchTap() {
    // This prevents ghost click.
    // eslint-disable-next-line no-undef
    event.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }

  handlePeopleLink() {
    this.setState({
      open: false,
    });
    browserHistory.push('people');
  }
  handleOutingLink() {
    this.setState({
      open: false,
    });
    browserHistory.push('outing');
  }
  render() {
    return (
      <div className={css.container}>
        <Header onMenuTap={this.handleTouchTap} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={this.handleTouchTap}
        >
          <MenuItem onTouchTap={this.handlePeopleLink}>People</MenuItem>
          <MenuItem onTouchTap={this.handleOutingLink}>Outings</MenuItem>
        </Drawer>
        <Footer />
      </div>);
  }
}

App.displayName = 'App';

export default connect()(App);