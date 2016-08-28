import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getAllPeople } from '../../../reducers/people';


class ViewPerson extends Component {
  constructor() {
    super();
    this.personRow = this.personRow.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  editUser(row) {
    const { allPeople } = this.props;
    const allPeopleArray = allPeople.toArray();
    browserHistory.push(`people/edit/${allPeopleArray[row[0]].get('id')}`);
  }
  personRow() {
    const { allPeople } = this.props;
    return allPeople.map(person => {
      return (
        <TableRow key={person.id}>
          <TableRowColumn>{person.get('id')}</TableRowColumn>
          <TableRowColumn>{person.get('name')}</TableRowColumn>
          <TableRowColumn>{person.get('number_coffee_drank')}</TableRowColumn>
          <TableRowColumn>{person.get('number_coffee_paid')}</TableRowColumn>
          <TableRowColumn>${person.get('coffee_price')}</TableRowColumn>
          <TableRowColumn>{person.get('created_at')}</TableRowColumn>
          <TableRowColumn>{person.get('updated_at')}</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div>
        <Table onRowSelection={this.editUser}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Coffees</TableHeaderColumn>
              <TableHeaderColumn>Paid</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>Updated At</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.personRow()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ViewPerson.propTypes = {
  allPeople: ImmutablePropTypes.map,
};

export default connect(
state => ({
  allPeople: getAllPeople(state),
}))(ViewPerson);