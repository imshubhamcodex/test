
exports.up = function(knex) {
return knex.schema.table('users', function(table){
    table.dropUnique(['username']);
    table.dropUnique(['password']);
} )
};

exports.down = function(knex) {
};
