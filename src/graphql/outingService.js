module.exports = {
  getOutingsByPerson: (id, client) => {
    return client('person_outing').where('person_id', id).select('outing_id')
    .then(result => {
      return result.map(r => r.outing_id);
    });
  },
  getOutings: (client) => {
    return client('outing').then(result => {
      return result;
    });
  },
  getOuting: (id, client) => {
    return client('outing').where('id', id).first()
    .then(result => {
      return result;
    });
  },
  createOuting: (args, client) => {
    let outing = null;
    return client.transaction(trx => {
      return trx.insert({ payer_id: args.payer_id, total_cost: args.total_cost })
                .into('outing')
                .returning(['id', 'payer_id', 'total_cost', 'created_at', 'updated_at'])
                .then(result => {
                  outing = result[0];
                  const personOutings = args.people_ids.map(personId => ({ outing_id: outing.id, person_id: personId }));
                  return trx.insert(personOutings)
                  .into('person_outing');
                });
    })
    .then(() => {
      return outing;
    });
  },
};