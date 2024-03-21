const config = require('../config');
const { Pool } = require('pg');
require('colors');

const conexionpghelptest = new Pool({
  user: config.postgresHelptest.user,
  host: config.postgresHelptest.host,
  database: config.postgresHelptest.database,
  password: config.postgresHelptest.password,
  port: config.postgresHelptest.port,
});

conexionpghelptest.on('connect', () => {
  console.log('Conexión a la base de datos PostgreSQL establecida correctamente'.green);
});

conexionpghelptest.on('error', (error) => {
  console.error('Error al conectar a la base de datos:'.red, error.message);
});


module.exports = {
  conexionpghelptest
};
