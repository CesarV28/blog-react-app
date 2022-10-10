const { User } = require("../models/user");


const emailExists = async ( email ) => {

    const exist = await User.findOne({ 
        where: {
            email
        }
     });

    if( exist ) {
        throw new Error( `El correo: ${email} ya esta registrado`);
    }
}

const validModels = ( model = '', models = [] ) => {
    
    const exist = models.includes( model );

    if( !exist ){
        throw new Error(`El modelo no esta definido den la base de datos - ${models}`);
    }

    return true;

}


module.exports = {
    emailExists,
    validModels
}