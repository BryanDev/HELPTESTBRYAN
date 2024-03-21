const app = require('./app.js');
require('colors');

app.listen(app.get('port'),()=>{
    console.log('Servidor desplegado correctamente por el puerto: '.yellow , app.get('port'))
})