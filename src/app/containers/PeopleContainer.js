import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import People from '../components/people';
import { getAllPeople, fetchAllPeople } from '../reducers/people';


class PeopleContainer extends Component {
  constructor(props) {
    super();
    if (!props.allPeople.size) {
      props.fetchAllPeople();
    }
  }

  render() {
    return (
      <People />
    );
  }
}

PeopleContainer.displayName = 'PeopleContainer';

PeopleContainer.propTypes = {
  allPeople: ImmutablePropTypes.map,
  fetchAllPeople: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    allPeople: getAllPeople(state),
  }),
  dispatch => ({
    fetchAllPeople: () => dispatch(fetchAllPeople()),
  }))(PeopleContainer);