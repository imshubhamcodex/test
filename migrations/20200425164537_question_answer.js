
exports.up = function(knex) {
    return knex.schema.table('question_answer', function (table) {
        table.text('explanation','longtext');
      });
};

exports.down = function(knex) {
    return knex.schema.table('question_answer', function (table) {
        table.dropColumn('explanation');
      });
};




  