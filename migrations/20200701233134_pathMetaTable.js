
exports.up = function(knex) {
    return knex.schema.createTable('pathMeta', function (table) {
        table.increments('pid');
        table.text('path','longtext').notNullable();       
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pathMeta');
}
