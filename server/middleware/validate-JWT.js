const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');
    console.log(token)
    if(!token) {
        return res.status(401).json({
            msg: 'No hay TOKEN en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findOne({
            where: {
                id: uid
            },
            attributes: ['id', 'username']    
        });

        if(!user){
            return res.status(401).json({
                msg: 'El usuario no existe en la BD'
            });
        }

      
        req.uid = user.id, 
        req.username = user.username
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

    //console.log(token)

}



module.exports = {
    validateJWT,
}