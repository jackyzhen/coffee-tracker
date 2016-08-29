import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';

import { getAllPeople, editPerson } from '../../../reducers/people';

class EditPerson extends Component {
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
    this.props.editPerson(this.props.params.id, data.name, data.price);
  }
  render() {
    const { params: { id }, allPeople } = this.props;
    const person = allPeople.get(~~id);
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
            value={person.get('name')}
          />
          <FormsyText
            name="price"
            validations="isNumeric"
            validationError="Please provide a number"
            required
            hintText="How much does your coffee cost?"
            floatingLabelText="Coffee Cost"
            value={person.get('coffee_price')}
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

EditPerson.propTypes = {
  params: PropTypes.object,
  allPeople: ImmutablePropTypes.map,
  editPerson: PropTypes.func.isRequired,
};

export default connect(
state => ({
  allPeople: getAllPeople(state),
}),
dispatch => ({
  editPerson: (id, name, coffee) => dispatch(editPerson(id, name, coffee)),
}))(EditPerson);