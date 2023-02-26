const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userOnline, userDisconnect, saveMessage } = require('../controllers/socket');

//Mensaje del socket
io.on('connect', client => {

    console.log('Cliente conectado');

    //El cliente entro con JWT, si no tiene token no le deja entrar
    const [valido, uid] = comprobarJWT(client.handshake.headers['authorization']);
    
    if( !valido ){ return client.disconnect(); }

    //Cliente autenticado 
    userOnline( uid );

    //INGRESAR AL USUARIO A UNA SALA (PARA EL CHAT)
    //Sala global
    client.join(uid);
    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
         //GUARDAR EL MENSAJE EN LA BASE DE DATOS
         await saveMessage( payload );
         //Mostrar mensaje
        io.to( payload.to ).emit('mensaje-personal', payload);
    });

    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        userDisconnect( uid );
     });     //Notifica cuando el cliente se desconecta

});