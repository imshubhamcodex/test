
exports.up = function(knex) {
    return knex.schema.createTable('user_answer', function (table) {
      table.increments('usid');
      table.integer('question').unsigned().notNullable();
      table.foreign('question').references('qsid').inTable('question');
      table.string('answer');
      table.boolean('status').defaultTo(1);
      table.timestamp('created');
     
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user_answer', function (table) {
      table.dropForeign('question').references('qsid').inTable('quiz');
    });
  };
  
