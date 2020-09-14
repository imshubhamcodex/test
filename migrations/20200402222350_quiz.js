
exports.up = function (knex) {
  return knex.schema.createTable('quiz', function (table) {
    table.increments('qid');
    table.string('title');
    table.string('header');
    table.integer('fid').unsigned().notNullable();
    table.foreign('fid').references('fid').inTable('file');
    table.integer('cat_id').unsigned().notNullable();
    table.foreign('cat_id').references('id').inTable('category');
    table.boolean('status').defaultTo(1);
    table.timestamp('created');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('quiz', function (table) {
    table.dropForeign('cat_id').references('id').inTable('category');
    table.dropForeign('fid').references('fid').inTable('file');
  });
};
