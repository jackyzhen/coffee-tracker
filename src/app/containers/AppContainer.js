import React, { Component, PropTypes } from 'react';
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
        <App children={this.props.children} />
      </MuiThemeProvider>
    );
  }
}

AppContainer.displayName = 'AppContainer';
AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default connect()(AppContainer);