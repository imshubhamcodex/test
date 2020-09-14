import bookself from '../../server/bookself';

export const File = bookself.Model.extend({
    tableName : 'file',
    idAttribute : 'fid',
})


