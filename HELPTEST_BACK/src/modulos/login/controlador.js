const db = require('./scripts');

const tabladb = 'ht_usuarios';


function iniciarSesion (usuario){
    return db.iniciarSesion(tabladb,usuario);
}

function contadorIntentosFallidos(usuario){
    return db.contadorIntentosFallidos(tabladb,usuario)
}


function actualizarFechaIngreso(usuario){
    return db.actualizarFechaIngreso(tabladb,usuario)
}


module.exports = {
    iniciarSesion,
    contadorIntentosFallidos,
    actualizarFechaIngreso
}