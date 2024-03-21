const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');


const router = express.Router();

router.get('/',todos);



async function todos (req,res,next){
    try {
        const todos = await controlador.todos();
        respuesta.success(req,res,todos,200,'usuarios helptest')
    } catch (err) {
        next(err)
    }
}


module.exports = router;