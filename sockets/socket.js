const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userOnline, userDisconnect } = require('../controllers/socket');

//Mensaje del socket
io.on('connect', client => {

    console.log('Cliente conectado');

    //El cliente entro con JWT, si no tiene token no le deja entrar
    const [valido, uid] = comprobarJWT(client.handshake.headers['authorization']);
    console.log(valido, uid);
    if( !valido ){ return client.disconnect(); }

    //Cliente autenticado 
    userOnline( uid );
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        userDisconnect( uid );
     });     //Notifica cuando el cliente se desconecta

});