import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ViewPerson extends Component {
  constructor() {
    super();
    this.personRow = this.personRow.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  editUser(row) {
    const { data: { allPeople } } = this.props;
    browserHistory.push(`people/edit/${allPeople[row[0]].id}`);
  }
  addUser() {
    browserHistory.push('people/add');
  }
  personRow() {
    const { data: { allPeople, loading } } = this.props;
    if (loading) return <div />;
    return allPeople.map(person => {
      return (
        <TableRow key={person.id}>
          <TableRowColumn>{person.name}</TableRowColumn>
          <TableRowColumn>{person.number_coffee_drank}</TableRowColumn>
          <TableRowColumn>{person.number_coffee_paid}</TableRowColumn>
          <TableRowColumn>$ {person.coffee_price.toFixed(2)}</TableRowColumn>
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
        <div style={{ padding: '5px 0px 5px 20px' }}> <h3>People</h3> </div>
        <Divider />
        <Table onRowSelection={this.editUser} >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={{ color: '#3d3327' }}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Coffees Drank</TableHeaderColumn>
              <TableHeaderColumn>Coffees Paid</TableHeaderColumn>
              <TableHeaderColumn>Coffee Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.personRow()}
          </TableBody>
        </Table>
        <FloatingActionButton onTouchTap={this.addUser} backgroundColor="#6d8165" style={{ position: 'fixed', bottom: '5%', right: '3%' }}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

ViewPerson.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    allPeople: PropTypes.array,
  }).isRequired,
};

const AllPeopleForDisplay = gql`
  query AllPeopleForDisplay{
    allPeople: people {
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

export default graphql(AllPeopleForDisplay)(ViewPerson);
// export default connect(
// state => ({
//   allPeople: getAllPeople(state),
// }))(ViewPerson);