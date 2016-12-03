import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../components/app';

function AppContainer(props) {
  return (
    <MuiThemeProvider>
      <App children={props.children} />
    </MuiThemeProvider>
  );
}

AppContainer.displayName = 'AppContainer';
AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContainer;