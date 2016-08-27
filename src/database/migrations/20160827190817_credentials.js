
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('credential', t => {
      t.increments('id').primary();
      t.string('username').notNullable();
      t.string('password').notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable('credential')]);
};
