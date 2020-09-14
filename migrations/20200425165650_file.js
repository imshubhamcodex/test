
exports.up = function(knex) {
    return knex.schema.table('file', function(table){
        table.string('originalname').notNullable;
      });
};

exports.down = function(knex) {
    return knex.schema.table('file',function(table){
        table.dropColumn('originalname');
    });
};
