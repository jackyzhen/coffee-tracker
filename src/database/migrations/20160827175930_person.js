
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('person', t => {
      t.increments('id').primary();
      t.string('name').notNullable();
      t.decimal('number_coffee_drank').notNullable().defaultTo(0);
      t.decimal('number_coffee_paid').notNullable().defaultTo(0);
      t.decimal('coffee_price').notNullable().defaultTo(0);
      t.timestamps(true, true);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable('person')]);
};
