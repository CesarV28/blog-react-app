const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFileFun = ( files, validExtensions = ['jpg', 'png', 'jpeg', 'gif'], dir = '' ) => {

    return new Promise( ( resolve, reject) => {

        const { fileName } = files;
    
        const cutName = fileName.name.split('.');
        const extension = cutName[cutName.length - 1 ];

        if( !validExtensions.includes(extension)){
            return reject(`La extension ${extension} no es valida, extensiones validas: ${validExtensions}`);
        }


        const tempName = uuidv4() + '.' + extension; 
        const uploadPath = path.join(__dirname, '../uploads/', dir, tempName);

        fileName.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve( tempName );
        });

    })

    
}

module.exports = {
    uploadFileFun
}