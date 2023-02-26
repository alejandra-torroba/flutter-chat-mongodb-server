//PATH: /api/message

const { Router } = require('express');
const { obtenerChat } = require('../controllers/message');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Mostrar los usuarios

router.get('/:to', validarJWT, obtenerChat );

module.exports = router;