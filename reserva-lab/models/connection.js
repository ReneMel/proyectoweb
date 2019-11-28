//npm install --save pg-promise bluebird
const promise = require('bluebird');
const options = {
    promiseLib: promise
};
const pgp = require('pg-promise')(options);
//postgres://username:password@host:port/databasename
const connectionString = 'postgres://postgres:rizahawkeye@localhost:5432/reserva_lab';
const connection = pgp(connectionString);

module.exports = {connection}