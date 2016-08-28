import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../components/app';

class AppContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    );
  }
}

AppContainer.displayName = 'AppContainer';

export default connect()(AppContainer);