import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import { OutingQuery } from '../../../graphqlQueries/outingQueries';

function OutingDetail(props) {
  const { data: { outing, allPeople, loading } } = props;

  if (loading) return null;
  const payer = allPeople.find(p => p.id === outing.payer_id).name;
  const people = outing.personIds.map(id => {
    const drinker = allPeople.find(p => p.id === id);
    return <span><Link style={{ color: 'black' }} to={`/people/edit/${drinker.id}`}>{drinker.name}</Link> | </span>;
  });
  const dateTime = outing.created_at;

  return (
    <Paper
      style={{
        width: '100%',
        marginBottom: '3%',
      }}
    >
      <div style={{ padding: '10px 0px 10px 20px' }}> <h3>{`${new Date(dateTime).toDateString()} ${new Date(dateTime).toLocaleTimeString()}`}</h3> </div>
      <Divider />
      <div style={{ padding: '10px 0px 10px 20px' }}>Payer: <Link style={{ color: 'black' }} to={`/people/edit/${outing.payer_id}`}>{payer}</Link></div>
      <div style={{ padding: '10px 0px 10px 20px' }}>Drinkers: {people}</div>
      <div style={{ padding: '10px 0px 10px 20px' }}>Total Cost: ${outing.total_cost.toFixed(2)}</div>
    </Paper>
  );
}

OutingDetail.propTypes =
{
  params: PropTypes.object,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    outing: PropTypes.object,
    allPeople: PropTypes.array,
  }).isRequired,
};

const options = ({ params }) => ({ variables: { id: params.id } });
const connectedComponent = graphql(OutingQuery, { options })(OutingDetail);

export default connectedComponent;