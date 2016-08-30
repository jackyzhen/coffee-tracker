import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { getAllOutings } from '../../../reducers/outing';
import { getAllPeople } from '../../../reducers/people';

class ViewOuting extends Component {
  constructor() {
    super();
    this.outingRow = this.outingRow.bind(this);
  }

  outingRow() {
    const { allOutings, allPeople } = this.props;
    return allOutings.map(outing => {
      const payer = allPeople.get(outing.get('payer_id')).get('name');
      const people = outing.get('personIds').map(id => allPeople.get(id).get('name')).join(', ');
      return (
        <TableRow key={outing.id}>
          <TableRowColumn>{outing.get('created_at')}</TableRowColumn>
          <TableRowColumn>{payer}</TableRowColumn>
          <TableRowColumn>{people}</TableRowColumn>
          <TableRowColumn>${outing.get('total_cost')}</TableRowColumn>
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
        <Table onRowSelection={this.editUser} >
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
        <FloatingActionButton onTouchTap={this.addUser} backgroundColor="#6d8165" style={{ position: 'fixed', bottom: '5%', right: '3%', }}>
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