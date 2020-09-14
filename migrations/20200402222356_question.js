
exports.up = function (knex) {
  return knex.schema.createTable('question', function (table) {
    table.increments('qsid');
    table.text('Question', 'longtext');
    table.string('type');
    table.integer('quiz').unsigned().notNullable();
    table.foreign('quiz').references('qid').inTable('quiz');
    table.boolean('status').defaultTo(1);
    table.timestamp('created');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('question', function (table) {
    table.dropForeign('quiz').references('qid').inTable('quiz');

  });
};
