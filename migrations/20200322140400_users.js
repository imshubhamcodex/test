
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments('uid');
    table.string('username').unique().notNullable;
    table.string('email').unique().notNullable;
    table.string('password').unique().notNullable;
    table.string('role');
    table.string('userimage');
    table.boolean('status').defaultTo(0);
    table.timestamp('created');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
