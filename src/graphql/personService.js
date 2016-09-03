module.exports = {
  getPeopleByOuting: (id, client) => {
    return client('person_outing').where('outing_id', id).select('person_id')
    .then(result => {
      return result.map(r => r.person_id);
    });
  },
  getFullPeopleByOuting: (id, client) => {
    return client.from('person_outing').innerJoin('person', 'person_outing.person_id', 'person.id').where('outing_id', id).select('person.*')
    .then(result => {
      return result;
    });
  },
  getPeople: (client) => {
    return client('person').then(result => {
      return result;
    });
  },
  getPerson: (id, client) => {
    return client('person').where('id', id).first()
    .then(result => {
      return result;
    });
  },
  createPerson: (person, client) => {
    return client('person')
            .insert(person)
            .returning(['id', 'name', 'number_coffee_drank', 'number_coffee_paid', 'coffee_price', 'created_at', 'updated_at'])
    .then(result => {
      const createdPerson = result[0];
      createdPerson.outingIds = [];
      return createdPerson;
    });
  },
  editPerson: (person, client) => {
    return client('person')
            .update({
              name: person.name,
              number_coffee_drank: person.number_coffee_drank,
              number_coffee_paid:
              person.number_coffee_paid,
              coffee_price: person.coffee_price,
              updated_at: client.fn.now(),
            })
            .where('id', person.id)
            .returning(['id', 'name', 'number_coffee_drank', 'number_coffee_paid', 'coffee_price', 'created_at', 'updated_at'])
    .then(result => {
      return result[0];
    });
  },
};