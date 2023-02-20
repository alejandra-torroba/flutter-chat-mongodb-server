
//path: api/login

const { Router } = require('express');
const { check } = require('express-validator');

const { newUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña es obligatorio').not().isEmpty(),
    validarCampos
], newUser );

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login );

//Validar token

router.get('/renew', validarJWT, renewToken );

module.exports = router;