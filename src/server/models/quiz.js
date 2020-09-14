import bookself from '../../server/bookself';

export const Quiz = bookself.Model.extend({
    tableName : 'quiz',
    idAttribute : 'qid',
})


