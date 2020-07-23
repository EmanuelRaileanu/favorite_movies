const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development:{
      client: 'mysql2',
      connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME
      },
      migrations: {
          tableName: 'knex_migrations'
      }
    },
    staging: {
      client: 'mysql2',
      connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME
      },
      migrations: {
          tableName: 'knex_migrations'
      },
      pool: {
        min: 2,
        max: 10
      }
    },
  
    production: {
      client: 'mysql2',
      connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME
      },
      migrations: {
          tableName: 'knex_migrations'
      },
      pool: {
        min: 2,
        max: 10
      }
    }
  };