import React, { Component } from 'react';
import { connect } from 'react-redux';
import Outing from '../components/outing';

class OutingContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Outing />
    );
  }
}

OutingContainer.displayName = 'OutingContainer';

export default connect()(OutingContainer);