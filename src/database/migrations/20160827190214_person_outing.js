
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('person_outing', t => {
      t.integer('person_id').references('person.id');
      t.integer('outing_id').references('outing.id');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable('person_outing')]);
};
