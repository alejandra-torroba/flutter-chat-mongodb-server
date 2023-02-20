const { io } = require('../index');

//Mensaje del socket
io.on('connect', client => {

    console.log('Cliente conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });     //Notifica cuando el cliente se desconecta

     //client.on('mensaje',( paylog ) => {
     //   console.log('Mensaje ', paylog );
     //   io.emit('mensaje', { admin: 'Nuevo mensaje' });
     //});

});