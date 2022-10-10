const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFileFun } = require('../helpers/upload-file');
const { Post } = require('../models/post');
const { User } = require('../models/user');


const uploadFile = async( req, res ) => {

   try {
        const fileName =  await uploadFileFun(req.files, undefined, 'post');
        
        res.json({
            fileName
        });
   } catch (error) {
        res.status(400).json({
            error
        });
   }

}

const updateFile = async( req, res ) => {

    const { model, id } = req.params;

    let modelUpdate;

    switch ( model ) {
        case 'post':
        
            modelUpdate = await Post.findOne({ where: { id } });

            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe post con id ${ id }`
                });
            }

            break;
    
        case 'user':
    
            modelUpdate = await User.findOne({ where: { id } });
            
            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe usuario con id ${ id }`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Fallo en la implementacíon'});
    }

    // clear last img
    if( modelUpdate.img ){
        console.log(modelUpdate.img)
        const pathImg = path.join( __dirname, '../uploads/', model, modelUpdate.img);
        console.log(pathImg)
        if( fs.existsSync( pathImg ) ){
            console.log('img delete')
            fs.unlinkSync( pathImg );
        }
    }

    const fileName = await uploadFileFun(req.files, undefined, model);

    modelUpdate.img = fileName;

    modelUpdate.save();

    res.json({
        modelUpdate,
    });

}

const updateFileCloudinary = async( req, res ) => {

    try {
        const { tempFilePath } = req.files.fileName;

        const resp = await cloudinary.uploader.upload( tempFilePath );
        const { secure_url } = resp;

        res.json(secure_url);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, por favor hable con el adminsitrador.',
        });
    }
}

const updateFileCloudinaryById = async( req, res ) => {

    const { model, id } = req.params;

    let modelUpdate;

    switch ( model ) {
        case 'post':
        
            modelUpdate = await Post.findOne({ where: { id } });

            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe post con id ${ id }`
                });
            }

            break;
    
        case 'user':
    
            modelUpdate = await User.findOne({ where: { id } });
            
            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe usuario con id ${ id }`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Fallo en la implementacíon'});
    }

    // clear last img
    if( modelUpdate.img ){
        const nameArray = modelUpdate.img.split('/');
        const name = nameArray[ nameArray.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.fileName;

    const resp = await cloudinary.uploader.upload( tempFilePath );
    const { secure_url } = resp;

    modelUpdate.img = secure_url;

    modelUpdate.save();

    res.json({
        modelUpdate,
    });

}

const getImage = async( req, res ) => {

    const { model, id } = req.params;

    let modelUpdate;

    switch ( model ) {
        case 'post':
        
            modelUpdate = await Post.findOne({ where: { id } });

            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe post con id ${ id }`
                });
            }

            break;
    
        case 'user':
    
            modelUpdate = await User.findOne({ where: { id } });
            
            if( !modelUpdate ) {
                return res.status(400).json({
                    msg: `No existe usuario con id ${ id }`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Fallo en la implementacíon'});
    }

    // clear last img
    if( modelUpdate.img ){
        console.log(modelUpdate.img)
        const pathImg = path.join( __dirname, '../uploads/', model,modelUpdate.img);
        if( fs.existsSync( pathImg ) ){
            return res.sendFile( pathImg );
        }
    }

    const pathNoImg = path.join( __dirname, '../assets/', 'no-image.jpg');

    return res.sendFile( pathNoImg );
}


module.exports = {
    uploadFile,
    updateFile,
    getImage,

    updateFileCloudinary,
    updateFileCloudinaryById
}