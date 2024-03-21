const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');
const moment = require('moment');

const router = express.Router();



router.post('/iniciarsesion/:usuario/:contrasena', iniciarSesion);


async function iniciarSesion(req, res, next) {
    const usuario = req.params.usuario;
    const contrasena = req.params.contrasena;
    
    try {
        const usuariobuscado = await controlador.iniciarSesion(usuario);
        
        if (usuariobuscado.length > 0) {
            const fechaVencimientoClave = moment(usuariobuscado[0].fecha_vencimiento_clave);
            const fechaActual = moment();

            if (usuario === usuariobuscado[0].nombre_usuario && contrasena === usuariobuscado[0].contrasena) {
                if (fechaActual.isAfter(fechaVencimientoClave)) {
                    respuesta.success(req, res, usuariobuscado, 200, 'INFO', 'Su contraseña ha caducado, cámbiela en este momento', false);
                } else if (usuariobuscado[0].intentos_fallidos >= 3) {
                    respuesta.success(req, res, usuariobuscado, 200, 'ERROR', 'Usuario bloqueado por intentos fallidos', false);
                } else if (usuariobuscado[0].estado === false) {
                    respuesta.success(req, res, usuariobuscado, 200, 'ERROR', 'Usuario inactivo, contacte con el administrador del sistema', false);
                } else if (usuariobuscado[0].rol === null) {
                    respuesta.success(req, res, usuariobuscado, 200, 'ERROR', 'El usuario no cuenta con un rol asignado', false);
                } else {
                    respuesta.success(req, res, usuariobuscado, 200, 'CONFIRMACION', 'Sesión iniciada con éxito', true);
                    controlador.actualizarFechaIngreso(usuario)
                }
            } else {

                if(usuariobuscado[0].intentos_fallidos >= 3){
                    respuesta.success(req, res, usuariobuscado, 200, 'ERROR', 'Usuario bloqueado por intentos fallidos', false);
                }
                    respuesta.success(req, res, usuariobuscado, 200, 'INFO', `Contraseña incorrecta, le quedan ${3 - usuariobuscado[0].intentos_fallidos } intentos más o su cuenta sera bloqueada`, false);
                    controlador.contadorIntentosFallidos(usuario);
                    return;
            }
        } else {
            respuesta.success(req, res, usuariobuscado, 200, 'ERROR', 'Usuario inexistente, contacte al administrador del sistema', false);
            return;
        }
    } catch (err) {
        next(err);
    }
}




module.exports = router;