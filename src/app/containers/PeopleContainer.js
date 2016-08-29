import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getAllPeople, fetchAllPeople } from '../reducers/people';


function PeopleContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

PeopleContainer.displayName = 'PeopleContainer';

PeopleContainer.propTypes = {
  allPeople: ImmutablePropTypes.map,
  fetchAllPeople: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  state => ({
    allPeople: getAllPeople(state),
  }),
  dispatch => ({
    fetchAllPeople: () => dispatch(fetchAllPeople()),
  }))(PeopleContainer);