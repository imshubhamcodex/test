
exports.up = function(knex) {
    return knex.schema.createTable('metadata', function (table) {
        table.increments('mid');
        table.integer('pathId').unsigned().notNullable();
        table.foreign('pathId').references('pid').inTable('pathMeta')
        table.string('key').notNullable();
        table.string('value').notNullable();       
      });
};

exports.down = function(knex) {
  
};
