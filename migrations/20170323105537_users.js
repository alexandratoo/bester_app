exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.integer('points').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
