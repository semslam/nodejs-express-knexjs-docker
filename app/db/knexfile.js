// Update with your config settings.
require('dotenv').config();

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


 module.exports = {
  development: {
    client: CLIENT,
    connection: {
      host: 'db',// this is container host, the default host is localhost or 127.0.0.1
      user : PG_USER,
      password:PASSWORD,
      database : DATABASE
      }
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  }