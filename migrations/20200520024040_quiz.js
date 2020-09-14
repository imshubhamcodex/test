
exports.up = function(knex) {
    return knex.schema.table('quiz', function (table) {
        table.text('description', 'longtext');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('quiz', function (table) {
        table.dropForeign('cat_id').references('id').inTable('category');
        table.dropForeign('fid').references('fid').inTable('file');
      }); 
};
