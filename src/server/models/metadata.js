import bookself from '../../server/bookself';

export const Metadata = bookself.Model.extend({
    tableName : 'metadata',
    idAttribute : 'mid',
})


export const PathData = bookself.Model.extend({
    tableName: 'pathMeta',
    idAttribute:'pid'
})