import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { graphql } from 'react-apollo';
import { AllOutingsAllPeopleQuery } from '../../../graphqlQueries/outingQueries';
import SmartTable from '../../SmartTable';

class ViewOuting extends Component {
  constructor() {
    super();
    this.data = this.data.bind(this);
  }
  addOuting() {
    browserHistory.push('/outing/add');
  }
  data() {
    const { data: { allOutings, allPeople, loading } } = this.props;
    if (loading) return [];
    const sortedOutings = allOutings.sort((a, b) => b.id - a.id);
    return sortedOutings.map(outing => {
      const payer = allPeople.find(p => p.id === outing.payer_id).name;
      const people = outing.personIds.map(id => allPeople.find(p => p.id === id).name).join(', ');
      const dateTime = outing.created_at;
      return {
        id: outing.id,
        when: `${new Date(dateTime).toDateString()} ${new Date(dateTime).toLocaleTimeString()}`,
        who_paid: payer,
        who_went: people,
        total_cost: outing.total_cost,
      };
    });
  }
  render() {
    const tableHeaders = [
      { alias: 'When', sortable: true, dataAlias: 'when' },
      { alias: 'Payer', sortable: true, dataAlias: 'who_paid' },
      { alias: 'Drinkers', sortable: false, dataAlias: 'who_went' },
      { alias: 'Total', sortable: true, dataAlias: 'total_cost', format: { type: 'money' } },
    ];
    const data = this.data();
    return (
      <Paper
        style={{
          width: '100%',
          marginBottom: '3%',
        }}
      >
        <div style={{ padding: '5px 0px 5px 20px' }}> <h3>Outings</h3> </div>
        <Divider />
        <SmartTable {...{ tableHeaders, data, total: data.length, limit: 10, isLoading: this.props.data.loading }} />
        <FloatingActionButton onTouchTap={this.addOuting} backgroundColor="#6d8165" style={{ position: 'fixed', bottom: '5%', right: '3%' }}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

ViewOuting.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    allPeople: PropTypes.array,
    allOutings: PropTypes.array,
  }).isRequired,
};

export default graphql(AllOutingsAllPeopleQuery)(ViewOuting);