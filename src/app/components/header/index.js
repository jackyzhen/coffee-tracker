import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

export default function Header({ onMenuTap }) {
  return (
    <div>
      <AppBar
        title={<span>Coffee Tracker</span>}
        onLeftIconButtonTouchTap={onMenuTap}
        style={{ background: '#564032' }}
      />
    </div>
  );
}

Header.displayName = 'Header';

Header.propTypes = {
  onMenuTap: PropTypes.func,
};