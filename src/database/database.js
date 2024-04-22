import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";


// * conxion con render*****
 export const sequelize = new Sequelize({
  database: 'casino_tango_8d44',
  username: 'casino_tango_8d44_user',
  password: 'GTgHmSo4yOsHEVkduql6oZ26K8TSUGPH',
  host: 'dpg-coj6cjgcmk4c73af91dg-a.oregon-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  logging: false, // Set to true if you want to see SQL queries in logs
});

//  *******conexion con vercel****

// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DB_PORT, // Utiliza la variable de entorno para el puerto
//   database: process.env.DATABASE_DATABASE,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// });

// export const sequelize = new Sequelize(
//   process.env.DATABASE_DATABASE,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,                    
//    {
//     host: process.env.DATABASE_HOST,
//   dialect: 'postgres',
// });


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();