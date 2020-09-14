
exports.up = function(knex) {
  return knex.schema.createTable('question_answer', function (table) {
    table.increments('asid');
    table.integer('question').unsigned().notNullable();
    table.foreign('question').references('qsid').inTable('question');
    table.string('answer');
   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('question_answer', function (table) {
    table.dropForeign('question').references('qsid').inTable('quiz');

  });
};
