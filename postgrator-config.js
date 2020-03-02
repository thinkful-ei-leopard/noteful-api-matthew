require('dotenv').config();

module.exports = {
  'migrationDirectory': 'migration',
  'driver': 'pg',
  'connectionString': (process.env.NODE_ENV === 'test')
    ? process.env.TEST_TB_URL
    : process.env.DB_URL
};