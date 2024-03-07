import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";


// * conxion con render*****
//  export const sequelize = new Sequelize({
//   database: 'casino_tango_b11e',
//   username: 'casino_tango_b11e_user',
//   password: 'bYIGOgUD4qonlXyweiuxhkCcrSEABFJW',
//   host: 'dpg-cmc6knf109ks73ajb580-a.oregon-postgres.render.com',
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: true,
//   },
//   logging: false, // Set to true if you want to see SQL queries in logs
// });

//  *******conexion con vercel****

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE_DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// export const sequelize = new Sequelize(
//   process.env.DATABASE_DATABASE,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,                    
//    {
//     host: process.env.DATABASE_HOST,
//   dialect: 'postgres',
// });