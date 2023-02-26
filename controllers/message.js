const Message = require('../models/massege');

const obtenerChat = async(req, res) => {

    const myId = req.uid;
    const messageTo = req.params.to;

    res.json({
        ok: true,
        msg: 'Hola mensajes'
    });
}

module.exports = {
    obtenerChat
}