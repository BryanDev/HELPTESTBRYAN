const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require ('cors');
const usuarios = require('./modulos/usuarios/rutas');
const capcha = require('./modulos/captcha/rutas');
const login = require('./modulos/login/rutas');
const error = require('./red/errores')


const app = express();

//Configuración
app.set('port', config.app.port);

//Midelwares
app.use(morgan('dev'));
app.use(cors(config.app.cors));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//Rutas

app.use('/helptestback/login', login);
app.use('/helptestback/usuarioshelptest', usuarios);
app.use('/helptestback/capcha/', capcha);

app.use(error)

module.exports = app;