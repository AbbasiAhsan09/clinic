// sequelize.config.ts
import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
console.log("envFIle", process.env);

const sequelizeConfig: SequelizeOptions = {
  dialect: 'mysql', // Choose your database dialect (mysql, postgres, sqlite, etc.)
  host: process.env.DB_CONNECTION,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'doc_app',
  define : {
    underscored : true,
  },
  dialectOptions : {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
};

export = sequelizeConfig;