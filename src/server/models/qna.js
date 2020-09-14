import bookself from '../../server/bookself';

export const Question = bookself.Model.extend({
    tableName : 'question',
    idAttribute : 'qsid',
})

export const Answer = bookself.Model.extend({
    tableName : 'question_answer',
    idAttribute : 'asid'
})


