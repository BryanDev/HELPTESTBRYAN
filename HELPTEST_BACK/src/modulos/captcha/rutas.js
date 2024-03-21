const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');
const config = require('../../config');

const router = express.Router();

router.post('/:token/',consultaToken);



async function consultaToken (req,res,next){

    const token = req.params.token;
    const secretKey = config.catpcha.secret_key;
   
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        const { success, score } = data;
        if (success && score >= 0.5) {
            respuesta.success(req, res, data, 200, 'CONFIRMACION', 'Capcha resuelto', true);
        } else {
            respuesta.success(req, res, data, 200, 'INFO', 'Creemos que no humano,intetalo nuevamente', false);
        }
    } catch (error) {
        respuesta.success(req, res, data, 500, 'ERROR', 'Capcha invalido', false);
    }
}


module.exports = router;