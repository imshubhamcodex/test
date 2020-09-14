import bookself from '../../server/bookself';


export const Category = bookself.Model.extend({
  tableName: 'category',
  initialize: function() {
    console.log("test");
    this.on('fetching:collection', function(model, cols, options) {
     
    //console.log(collection);
    });
  }
});