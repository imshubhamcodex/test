
exports.up = function(knex) {
    return knex.schema.createTable('category', function(table){
        table.increments('id');
        table.string('category');
        table.boolean('status').defaultTo(1);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('category');
};
