const db = require('../../db/postgres');


function iniciarSesion(tabla, usuario) {
    return new Promise((res, rej) => {
      db.conexionpghelptest.query(`SELECT * FROM ${tabla} WHERE nombre_usuario = '${usuario}'`, (error, resultado) => {
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


function contadorIntentosFallidos(tabla,usuario){
  return new Promise((res, rej) => {
      db.conexionpghelptest.query(`UPDATE ${tabla} SET intentos_fallidos = intentos_fallidos + 1 WHERE nombre_usuario = '${usuario}'`, (error, resultado) => {
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

function actualizarFechaIngreso(tabla,usuario){
  return new Promise((res, rej) => {
      db.conexionpghelptest.query(`UPDATE ${tabla} SET fecha_ultimo_ingreso = now()WHERE nombre_usuario = '${usuario}'`, (error, resultado) => {
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
    iniciarSesion,
    contadorIntentosFallidos,
    actualizarFechaIngreso
  };



