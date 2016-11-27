import React, { PropTypes, Component } from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// import { getAllPeople, editPerson } from '../../../reducers/people';

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
  submitForm({ name, price }) {
    const { editPerson, params: { id }, push } = this.props;
    editPerson({ variables: { id, name, coffeeCost: price } })
    .then(push('/people'));
  }

  render() {
    const { data: { person, loading } } = this.props;

    if (loading) return <div />;

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
            value={person.name}
          />
          <FormsyText
            name="price"
            validations="isNumeric"
            validationError="Please provide a number"
            required
            hintText="How much does your coffee cost?"
            floatingLabelText="Coffee Cost"
            value={person.coffee_price}
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

EditPerson.propTypes =
{
  params: PropTypes.object,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    person: PropTypes.object,
  }).isRequired,
  editPerson: PropTypes.func.isrequired,
  push: PropTypes.func.isRequired,
};

const PersonForDisplay = gql`
  query ($id: Int!){
    person(id: $id) {
      id
      name
      number_coffee_drank
      number_coffee_paid
      coffee_price
      created_at
      updated_at
      outingIds
    }
  },
`;

const EditPersonMutation = gql`
  mutation($id: Int!, $name: String!, $coffeeCost: Float!) {
    editPerson(
      id: $id,
      name: $name,
      coffee_price: $coffeeCost
    )
    {
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

const options = ({ params }) => ({ variables: { id: params.id } });
const personQuery = graphql(PersonForDisplay, { options });
const editPersonMutation = graphql(
  EditPersonMutation, {
    name: 'editPerson',
  });
const connectedComponent = personQuery(editPersonMutation(EditPerson));

export default connect(
  null,
  dispatch => ({
    push: (location) => dispatch(push(location)),
  })
)(connectedComponent);