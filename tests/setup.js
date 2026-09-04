import dotenv from 'dotenv';

dotenv.config({
  path: '.env.test',
  quiet: true,
});

const { default: sequelize } = await import(
  '../src/config/database.js'
);

afterAll(async () => {
  await sequelize.close();
});