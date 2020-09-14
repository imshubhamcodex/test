
exports.up = function(knex) {
  return knex.schema.table('users',function(table){
   table.text('userimage','longtext').alter();
  }
)};

exports.down = function(knex) {
  
};
