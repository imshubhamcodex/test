import bookself from '../../server/bookself';

export const User = bookself.Model.extend({
  tableName: 'users',
  idAttribute: 'uid'
});


export const UserProfile = bookself.Model.extend({
  tableName: 'user_profile'
});