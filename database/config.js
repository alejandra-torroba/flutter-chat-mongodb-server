
//CONFIGURACIÓN DE LA BASE DE DATOS

const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        mongoose.set("strictQuery", false);
        
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        } );

        console.log( 'DB online' );

    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el administrador');
    }
}

module.exports = {
    dbConnection
}