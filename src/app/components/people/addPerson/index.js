import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { push } from 'react-router-redux';

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
  submitForm({ name, price }) {
    const { addPerson, push } = this.props;
    addPerson(name, price)
    .then(push('/people'));
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
  addPerson: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const AddPersonMutation = gql`
    mutation AddPersonMutation($name: String!, $coffeeCost: Float!) {
      createPerson(
        name: $name,
        coffee_price: $coffeeCost
      ){
        id
        name
        number_coffee_drank
        number_coffee_paid
        coffee_price
        created_at
        updated_at
        outingIds
      }
  }
`;

const connectedComponent = graphql(
  AddPersonMutation,
  {
    props: ({ mutate }) => ({
      addPerson: (name, coffeeCost) => mutate({
        variables: { name, coffeeCost },
        updateQueries: {
          AllPeopleForDisplay: (prev, { mutationResult }) => {
            const newPerson = mutationResult.data.createPerson;
            return Object.assign({}, prev, { allPeople: prev.allPeople.concat([newPerson]) });
          },
        },
      }),
    }),
  }
)(AddPerson);

export default connect(
  null,
  dispatch => ({
    push: (location) => dispatch(push(location)),
  })
)(connectedComponent);