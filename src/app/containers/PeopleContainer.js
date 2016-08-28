import React, { Component } from 'react';
import { connect } from 'react-redux';
import People from '../components/people';

class PeopleContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <People />
    );
  }
}

PeopleContainer.displayName = 'PeopleContainer';

export default connect()(PeopleContainer);