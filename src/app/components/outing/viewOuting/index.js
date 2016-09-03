import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { getAllOutings } from '../../../reducers/outing';
import { getAllPeople } from '../../../reducers/people';

class ViewOuting extends Component {
  constructor() {
    super();
    this.outingRow = this.outingRow.bind(this);
  }
  addOuting() {
    browserHistory.push('outing/add');
  }
  outingRow() {
    const { allOutings, allPeople } = this.props;
    const sortedOutings = allOutings.toArray().map(o => o.toJS()).sort((a, b) => b.id - a.id);
    return sortedOutings.map(outing => {
      const payer = allPeople.get(outing.payer_id).get('name');
      const people = outing.personIds.map(id => allPeople.get(id).get('name')).join(', ');
      const dateTime = outing.created_at;
      return (
        <TableRow key={outing.id}>
          <TableRowColumn>{ `${new Date(dateTime).toDateString()} ${new Date(dateTime).toLocaleTimeString()}`}</TableRowColumn>
          <TableRowColumn>{payer}</TableRowColumn>
          <TableRowColumn>{people}</TableRowColumn>
          <TableRowColumn>$ {outing.total_cost.toFixed(2)}</TableRowColumn>
        </TableRow>
      );
    });
  }
  render() {
    return (
      <Paper
        style={{
          width: '100%',
          marginBottom: '3%',
        }}
      >
        <div style={{ padding: '5px 0px 5px 20px' }}> <h3>Outings</h3> </div>
        <Divider />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={{ color: '#3d3327' }}>
            <TableRow>
              <TableHeaderColumn>When</TableHeaderColumn>
              <TableHeaderColumn>Who paid</TableHeaderColumn>
              <TableHeaderColumn>Who went</TableHeaderColumn>
              <TableHeaderColumn>Total Cost</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.outingRow()}
          </TableBody>
        </Table>
        <FloatingActionButton onTouchTap={this.addOuting} backgroundColor="#6d8165" style={{ position: 'fixed', bottom: '5%', right: '3%', }}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

ViewOuting.propTypes = {
  allOutings: ImmutablePropTypes.map,
  allPeople: ImmutablePropTypes.map,
};

export default connect(
state => ({
  allOutings: getAllOutings(state),
  allPeople: getAllPeople(state),
}))(ViewOuting);