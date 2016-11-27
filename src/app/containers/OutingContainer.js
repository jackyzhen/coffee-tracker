import React, { PropTypes } from 'react';

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

export default OutingContainer;