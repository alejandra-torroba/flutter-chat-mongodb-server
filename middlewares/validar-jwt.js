

const jwt = require('jsonwebtoken');


const validarJWT = ( req, res, next) => {

    //Leer el token
    const token = req.header('Authorization');

    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        });
    }

    try{

        //Validar el token
        const { uid } = jwt.verify( token, process.env.JWT_KEY);
        req.uid = uid;
        
        next();

    }catch{

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

   

}

module.exports = {
    validarJWT
}