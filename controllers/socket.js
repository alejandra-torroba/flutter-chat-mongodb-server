//Funciones o métodos que ejecuten cosas de los sockets

const User = require('../models/user');
const Message = require('../models/massege');

const userOnline = async ( uid = '' ) => {

    const user = await User.findById( uid );    //Buscar al usuario con el id

    //actualizar el online
    user.online = true;

    //guardarlo en la base de datos
    await user.save();

    return user;
}

const userDisconnect = async ( uid = '' ) => {

    const user = await User.findById( uid );    //Buscar al usuario con el id

    //actualizar el online
    user.online = false;

    //guardarlo en la base de datos
    await user.save();

    return user;
}

const saveMessage = async( payload ) => {
    /* El paylod tendria la estructura del mensaje {from:'', to:'', message: ''}*/

    try{
        const message = Message( payload );
        await message.save();
        return true;
    }catch(error){
        return error;
    }
}

module.exports = {
    userOnline,
    userDisconnect,
    saveMessage
}