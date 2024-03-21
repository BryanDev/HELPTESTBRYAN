require('dotenv').config();

module.exports = {
    app:{
        port : process.env.PORTAPP || 3001,
        cors : process.env.CORSAPP
    },
    catpcha:{
        secret_key : process.env.SECRET_KEY
    },
    postgresHelptest:{
        host : process.env.HOSTPGHELPTEST,
        database : process.env.DATABASEPGHELPTEST,
        user : process.env.USERPGHELPTEST,
        password : process.env.PASSWORDPGHELPTEST,
        port : process.env.PORTPGHELPTEST
    }
}