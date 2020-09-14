
exports.up = function(knex) {
    return knex.schema.dropTableIfExists('metadata');
};

exports.down = function(knex) {
  
};
