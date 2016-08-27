
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('outing', t => {
      t.increments('id').primary();
      t.integer('payer_id').references('person.id');
      t.decimal('total_cost').notNullable().defaultTo(0);
      t.timestamps(true, true);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable('outing')]);
};
