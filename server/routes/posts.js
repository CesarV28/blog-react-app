const { Router } = require('express');
const { check } = require('express-validator');

const { 
    postsGet, 
    postsPut, 
    postsPost, 
    postsDelete,  
    postGet
} = require('../controllers/posts');

const { fieldsValidator } = require('../middleware/fields-validator');
const { validateJWT } = require('../middleware/validate-JWT');

const router = Router();

// Controllers
router.get('/', postsGet);

router.get('/:id', postGet);

router.put('/:id', [
    validateJWT,
    check('title', 'El nombre es obligatorio').not().isEmpty(),
    check('desc', 'La descripción es obligatoria').not().isEmpty(),
    fieldsValidator
],postsPut);

router.post('/', [
    validateJWT,
    check('title', 'El nombre es obligatorio').not().isEmpty(),
    check('desc', 'La descripción es obligatoria').not().isEmpty(),
    fieldsValidator
],postsPost);

router.delete('/:id', [
    validateJWT,
    fieldsValidator
],postsDelete);




module.exports = router;