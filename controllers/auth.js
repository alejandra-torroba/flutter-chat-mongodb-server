
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const newUser = async (req, res = response) => {

    const{ email, password } = req.body;

    try{ 

        //Comprueba si existe el email ya en la base de datos
        const existeEmail = await User.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

       const user = new User( req.body );          //Instancia de mi modelo

       //Ecnriptado de la contraseña para que no se vea en la base de datos
       const salt = bcrypt.genSaltSync();
       user.password = bcrypt.hashSync( password, salt );

       await user.save();                          //Para guardar los datos

       //Generar token JWT
       const token = await generarJWT( user.id );

       res.json({ 
         ok: true,
         user,
         token
        });

    }catch ( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try{

        const userDB = await User.findOne( { email} );

        if( !userDB ){                      //Validar el email
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );

        if(!validPassword){                 //Comprobar contraseña
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Se genera el token
        const token = await generarJWT( userDB.id );



        res.json({ 
         ok: true,
         user: userDB,
         token
        });

    }catch{

        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión, hable con el administrador'
        });

    }
}

const renewToken = async( req, res = response ) => {

    //Recuperar el UID del usuario
    const uid = req.uid;

    //Generar un nuevo JWT
    const token = await generarJWT( uid );

    //Obtener el usuario con el UID
    const user = await User.findById( uid );

    res.json({
        ok: true,
        user,
        token
    });
}


module.exports = {
    newUser,
    login,
    renewToken
}