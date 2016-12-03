import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import PeopleList from '../peopleList';
import { AllPeopleForDisplay } from '../../../graphqlQueries/peopleQueries';
import { AddOutingMutation } from '../../../graphqlQueries/outingQueries';

class AddOuting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      notSplurging: [],
      splurgingHard: [],
      luckyWinner: null,
      totalCost: 0,
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.getWinner = this.getWinner.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.allPeople) {
      return;
    }
    this.setState({
      notSplurging: nextProps.data.allPeople.map(p => ({
        key: p.id,
        label: p.name,
        numCoffeeDrank: p.number_coffee_drank,
        numCoffeePaid: p.number_coffee_paid,
        coffeePrice: p.coffee_price || 0,
        selected: false,
      })),
    });
  }
  getWinner() {
    const { splurgingHard } = this.state;
    const groupings = _(splurgingHard).groupBy(p => p.numCoffeeDrank - p.numCoffeePaid).value();

    const winningGroupKey = _(Object.keys(groupings)).maxBy(key => ~~key);
    const winningIndex = Math.floor(Math.random() * groupings[winningGroupKey].length);
    const winner = groupings[winningGroupKey][winningIndex];

    winner && (winner.selected = true);

    let totalCost = 0;
    splurgingHard.forEach(p => (totalCost += p.coffeePrice));

    this.setState({
      luckyWinner: winner,
      totalCost,
    });
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

  submitForm() {
    const { luckyWinner, totalCost, splurgingHard } = this.state;
    const { addOuting, push } = this.props;
    addOuting(luckyWinner.key, totalCost, splurgingHard.map(p => p.key))
      .then(push('/outing'));
  }

  addPerson(key) {
    this.splurgingHard = this.state.splurgingHard;
    this.notSplurging = this.state.notSplurging;

    const personToAddIndex = this.notSplurging.map((person) => person.key).indexOf(key);
    const personToAdd = this.notSplurging.splice(personToAddIndex, 1)[0];
    this.splurgingHard.push(personToAdd);

    this.setState({
      splurgingHard: this.splurgingHard,
      notSplurging: this.notSplurging,
      canSubmit: true,
    });
    this.getWinner();
  }

  removePerson(key) {
    this.splurgingHard = this.state.splurgingHard;
    this.notSplurging = this.state.notSplurging;

    const personToDeleteIndex = this.splurgingHard.map((person) => person.key).indexOf(key);
    const personToDelete = this.splurgingHard.splice(personToDeleteIndex, 1)[0];
    this.notSplurging.push(personToDelete);
    this.setState({
      splurgingHard: this.splurgingHard,
      notSplurging: this.notSplurging,
      canSubmit: this.splurgingHard.length,
    });
    this.getWinner();
  }

  render() {
    const { data: { loading } } = this.props;
    if (loading) return null;

    const { notSplurging, splurgingHard, luckyWinner, totalCost } = this.state;

    return (
      <Paper
        style={{
          width: '100%',
          padding: 20,
        }}
      >
        <h2>Coffee Time!</h2>
        <Divider />
        <p>Not Splurging:</p>
        <Paper style={{ minHeight: '60px' }} zDepth={1}>
          <PeopleList
            people={notSplurging}
            handleTouchTap={this.addPerson}
          />
        </Paper>
        <p>Splurging Hard:</p>
        <Paper style={{ minHeight: '60px' }} zDepth={1}>
          <PeopleList
            people={splurgingHard}
            handleRequestDelete={this.removePerson}
          />
        </Paper>
        <p>Lucky Winner:</p>
        <Paper style={{ minHeight: '60px' }} zDepth={1}>

          {luckyWinner &&
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
              <Chip
                key={luckyWinner.key}
                style={{ margin: 4 }}
              >
                <Avatar color="#66290b" backgroundColor="#bcbcbc" icon={<SvgIconFace />} />
                <span style={{ fontWeight: 'bold', color: '#66290b' }}> {luckyWinner.label} - {`(${luckyWinner.numCoffeeDrank} D / ${luckyWinner.numCoffeePaid} P)`} </span>
              </Chip>
            </div>
          }
        </Paper>
        <p>Total Cost: $ {totalCost.toFixed(2)}</p>
        <RaisedButton
          style={{
            marginTop: 32,
          }}
          type="submit"
          label="Save"
          disabled={!this.state.canSubmit}
          onTouchTap={this.submitForm}
        />
      </Paper>
    );
  }
}

AddOuting.propTypes = {
  addOuting: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    allPeople: PropTypes.array,
  }).isRequired,
};

const connectedComponent = graphql(AllPeopleForDisplay)(graphql(
  AddOutingMutation,
  {
    props: ({ mutate }) => ({
      addOuting: (payerId, totalCost, peopleIds) => mutate({
        variables: { payerId, totalCost, peopleIds },
        updateQueries: {
          AllOutingsQuery: (prev, { mutationResult }) => {
            const newOuting = mutationResult.data.createOuting;
            return Object.assign({}, prev, { allOutings: prev.allOutings.concat([newOuting]) });
          },
        },
      }),
    }),
  }
)(AddOuting));

export default connect(
  null,
  dispatch => ({
    push: (location) => dispatch(push(location)),
  })
)(connectedComponent);