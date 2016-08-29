import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';

import { addPerson } from '../../../reducers/people';

class AddPerson extends Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }
  submitForm(data) {
    this.props.addPerson(data.name, data.price);
  }
  render() {
    return (
      <Paper
        style={{
          width: '25%',
          margin: '5% auto auto auto',
          padding: 20,
        }}
      >
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
        >
          <FormsyText
            name="name"
            validations="isWords"
            validationError="Please only use letters"
            required
            hintText="What is your name?"
            floatingLabelText="Name"
          />
          <FormsyText
            name="price"
            validations="isNumeric"
            validationError="Please provide a number"
            required
            hintText="How much does your coffee cost?"
            floatingLabelText="Coffee Cost"
          />
          <RaisedButton
            style={{
              marginTop: 32,
            }}
            type="submit"
            label="Save"
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </Paper>
    );
  }
}

AddPerson.propTypes = {
  params: PropTypes.object,
  addPerson: PropTypes.func.isRequired,
};

export default connect(null,
dispatch => ({
  addPerson: (name, coffee) => dispatch(addPerson(name, coffee)),
}))(AddPerson);