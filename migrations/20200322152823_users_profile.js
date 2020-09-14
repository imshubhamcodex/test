
exports.up = function (knex) {
  return knex.schema.createTable('user_profile', function (table) {
    table.increments();
    table.text('certifications', 'longtext');
    table.text('qualifications', 'longtext');
    table.text('Organization', 'longtext');
    table.integer('user').unsigned().notNullable();
    table.foreign('user').references('uid').inTable('users');
    
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_profile', function (table){
    table.dropForeign('user').references('uid').inTable('users');
  });
};
