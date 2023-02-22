//Funciones o métodos que ejecuten cosas de los sockets

const User = require('../models/user');

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

module.exports = {
    userOnline,
    userDisconnect
}