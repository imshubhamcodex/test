
exports.up = function(knex) {
    return knex.schema.createTable('file', function(table){
        table.increments('fid');
        table.integer('uid').notNullable;
        table.string('filename');
        table.string('filepath');
        table.string('filemime');
        table.bigInteger('filesize');
        table.boolean('status').defaultTo(1);
        table.timestamp('created');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('file');
};
