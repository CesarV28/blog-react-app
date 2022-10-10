const { Router } = require('express');
const { check } = require('express-validator');


const { uploadFile, updateFile, getImage, updateFileCloudinary, updateFileCloudinaryById } = require('../controllers/uploads');
const { validModels } = require('../helpers/db-validators');
const { fieldsValidator } = require('../middleware/fields-validator');
const { fileValidator } = require('../middleware/files-validator');


const router = Router();

// local directory route using express-fileupload
// router.post('/', [
//     fileValidator,
//     fieldsValidator
// ],uploadFile);

router.post('/', [
    fileValidator,
    fieldsValidator
], updateFileCloudinary);

router.post('/:model/:id', [
    fileValidator,
    check('model').custom( m => validModels( m, ['post', 'user'])),
    fieldsValidator
], updateFileCloudinaryById);
// ],updateFile);

router.get('/:model/:id',[
    check('model').custom( m => validModels( m, ['post', 'user'])),
    fieldsValidator
], getImage)







module.exports = router