import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function OutingContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

OutingContainer.displayName = 'OutingContainer';

OutingContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect()(OutingContainer);