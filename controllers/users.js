const { response } = require("express");

const User = require('../models/user');


const getUsers = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;    //impelntación de paginación

    const users =  await User
            .find( {_id: { $ne: req.uid }} )        //sale una lista con todos los usuarios menos el propietario del id
            .sort('-online')
            .skip(desde)
            .limit(20);

    
    res.json({
        ok: true,
        users,
        desde
    });

} 

module.exports = {
    getUsers
}