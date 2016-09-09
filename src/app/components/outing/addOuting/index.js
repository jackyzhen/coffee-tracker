import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import _ from 'lodash';
import PeopleList from '../peopleList';
import { addOuting } from '../../../reducers/outing';
import { getAllPeople } from '../../../reducers/people';

class AddOuting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      notSplurging: props.allPeople.toArray().map(person => person.toJS()).map(p => ({
        key: p.id,
        label: p.name,
        numCoffeeDrank: p.number_coffee_drank,
        numCoffeePaid: p.number_coffee_paid,
        coffeePrice: p.coffee_price || 0,
        selected: false,
      })),
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

  getWinner() {
    const { splurgingHard } = this.state;
    let groupings = _(splurgingHard).groupBy(p => p.numCoffeeDrank / p.numCoffeePaid).value();

    const winningGroupKey = _(Object.keys(groupings)).maxBy(key => ~~key);
    const winningIndex = Math.floor(Math.random() * groupings[winningGroupKey].length);
    const winner = groupings[winningGroupKey][winningIndex];
    let totalCost = 0;
    splurgingHard.forEach(p => (totalCost += p.coffeePrice));
    winner && (winner.selected = true);

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
    this.props.addOuting(luckyWinner.key, totalCost, splurgingHard.map(p => p.key));
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
  allPeople: ImmutablePropTypes.map,
};

export default connect(
state => ({
  allPeople: getAllPeople(state),
}),
dispatch => ({
  addOuting: (payerId, totalCost, peopleIds) => dispatch(addOuting(payerId, totalCost, peopleIds)),
}))(AddOuting);