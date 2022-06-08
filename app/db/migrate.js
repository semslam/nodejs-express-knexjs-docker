const Knex = require('knex');
const knexfile = require('./knexfile');

// You can dynamically pass the database name
// as a command-line argument, or obtain it from
// a .env file

const dbConfig = knexfile.development;

console.log("<===Welcome Migration ===>");
console.log(knexfile);

const connection = {
  host:dbConfig.connection.host,
  user:dbConfig.connection.user,
  password:dbConfig.connection.password
}
console.log(connection);
async function main() {
  let knex = Knex({
    client: dbConfig.client,
    connection
  })
  
  // Lets create our database if it does not exist
  await knex.raw('CREATE DATABASE IF NOT EXISTS', dbConfig.connection.database)
  
  knex.destroy();
  // Now that our database is known, let's create another knex object
  // with database name specified so that we can run our migrations
//   knex = Knex({
//     client:  dbConfig.client,
//     connection: {
//       ...connection,
//       database: dbConfig.connection.database,
//     }
//   })

//   // Now we can happily run our migrations
//   await knex.migrate.latest()

  // Done!!
}

main().catch(console.log).then(process.exit)