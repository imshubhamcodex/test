
exports.up = function(knex) {
    return knex.schema.table('file', function(table){
        table.string('origionalname').notNullable;
      });
};

exports.down = function(knex) {
    return knex.schema.table('file',function(table){
        table.dropColumn('origionalname');
    });

};

