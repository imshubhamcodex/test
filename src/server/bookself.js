import knex from 'knex';
import bookself from 'bookshelf';
import knexConfig from '../../knexfile';


export default bookself(knex(knexConfig.development));