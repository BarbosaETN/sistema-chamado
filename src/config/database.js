import { Sequelize } from 'sequelize';

console.log('HOST:', process.env.MYSQLHOST);
console.log('PORT:', process.env.MYSQLPORT);

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
