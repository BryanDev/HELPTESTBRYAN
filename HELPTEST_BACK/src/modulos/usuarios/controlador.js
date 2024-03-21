const db = require('./scripts');

const tabladb = 'ht_usuarios';

function todos (){
    return db.todos(tabladb);
    db.conexionpghelptest.end();
}

module.exports = {
    todos
}