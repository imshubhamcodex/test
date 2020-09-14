
exports.up = function(knex) {
    return knex.schema.createTable('metadata', function (table) {
        table.increments('mid');
        table.integer('quiz').unsigned().notNullable();
        table.foreign('quiz').references('qid').inTable('quiz')
        table.string('key').notNullable;
        table.string('value').notNullable;       
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('metadata', function (table) {
        table.dropForeign('quiz').references('qid').inTable('quiz');
      });
};
