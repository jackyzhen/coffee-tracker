import React, { PropTypes } from 'react';

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

export default PeopleContainer;