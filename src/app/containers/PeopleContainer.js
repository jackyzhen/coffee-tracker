import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function PeopleContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

PeopleContainer.displayName = 'PeopleContainer';

PeopleContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect()(PeopleContainer);