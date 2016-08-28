import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import css from './styles';

export default function Header({ onMenuTap }) {
  return (
    <div>
      <AppBar
        title={<span>Coffee Tracker</span>}
        onLeftIconButtonTouchTap={onMenuTap}
        style={{ background: '#6F4E37' }}
      />
    </div>
    );
}

Header.displayName = 'Header';

Header.propTypes = {
  onMenuTap: PropTypes.func,
};