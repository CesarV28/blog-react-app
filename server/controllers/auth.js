const { User } = require("../models/user")
const bcryptjs = require('bcryptjs'); 
const { generateJWT } = require("../helpers/generate-JWT");



const authRegister = async( req, res) => {

    const {
        username,
        email,
        password,
    } = req.body;

    try {
        const user = new User({username, email, password});

        // Cryp password
        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync( password, salt );

        // Save on database
        await user.save();

        res.status(201).json({
            msg: 'Usuario registrado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}

const authLogin = async( req, res) => {

    const {
        email,
        password,
    } = req.body;

    try {

        const user = await User.findOne({ 
            where: {
                email,
            }
        });

        if( !user ) {
            console.log('!user')
            return res.status(400).json({
                msg: 'El email no existe.'
            });
        }

        // Validate password
        const validatePassword = bcryptjs.compareSync( password, user.password );

        if( !validatePassword ) {
            console.log('!password')
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id );
    
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                img: user.img
            },
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}

const authLogout = ( req, res) => {
    res.json({
        msg: 'Logout - It is works'
    })
}


module.exports = {
    authRegister,
    authLogin,
    authLogout,
}