import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { graphql } from 'react-apollo';
import { AllPeopleForDisplay } from '../../../graphqlQueries/peopleQueries';
import SmartTable from '../../SmartTable';

class ViewPerson extends Component {
  constructor() {
    super();
    this.data = this.data.bind(this);
  }

  addUser() {
    browserHistory.push('/people/add');
  }

  data() {
    const { data: { allPeople, loading } } = this.props;
    if (loading || !allPeople) return [];
    return allPeople.map(person => {
      return {
        name: person.name,
        coffees_drank: person.number_coffee_drank,
        coffees_paid: person.number_coffee_paid,
        coffees_price: person.coffee_price,
        id: person.id,
      };
    });
  }

  render() {
    const tableHeaders = [
      { alias: 'Name', sortable: true, dataAlias: 'name', format: { type: 'link', url: '/people/edit' } },
      { alias: 'Coffees Drank', sortable: true, dataAlias: 'coffees_drank' },
      { alias: 'Coffees Paid', sortable: true, dataAlias: 'coffees_paid' },
      { alias: 'Coffees Price', sortable: true, dataAlias: 'coffees_price', format: { type: 'money' } },
    ];
    const data = this.data();
    return (
      <Paper
        style={{
          width: '100%',
          marginBottom: '3%',
        }}
      >
        <div style={{ padding: '5px 0px 5px 20px' }}> <h3>People</h3> </div>
        <Divider />
        <SmartTable {...{ tableHeaders, data, total: data.length, limit: 10, isLoading: this.props.data.loading }} />
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

export default graphql(AllPeopleForDisplay)(ViewPerson);
