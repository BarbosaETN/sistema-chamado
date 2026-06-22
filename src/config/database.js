import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const result = dotenv.config();

console.log('HOST:', process.env.MYSQLHOST);
console.log('PORT:', process.env.MYSQLPORT);
console.log(result);

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
