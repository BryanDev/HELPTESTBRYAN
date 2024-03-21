const db = require('../../db/postgres');


function todos(tabla) {
    return new Promise((res, rej) => {
      db.conexionpghelptest.query(`SELECT * FROM ${tabla}`, (error, resultado) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          rej(error);
        } else {
          console.log('Resultados de la consulta:', resultado.rows);
          res(resultado.rows);
        }
      });
    });
  }

  module.exports = {
    todos
  };
  