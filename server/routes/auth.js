const { Router } = require('express');
const { check } = require('express-validator');

const { 
    authRegister,
    authLogin,
    authLogout
} = require('../controllers/auth');

const { emailExists } = require('../helpers/db-validators');

const { fieldsValidator } = require('../middleware/fields-validator');

const router = Router();

// Controllers
router.post('/register', [
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mayor a 6 caracteres').isLength( {min: 6} ),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom( emailExists ),
    fieldsValidator
],authRegister);

router.post('/login', [
    check('email', 'El email no es valido').isEmail(),
    fieldsValidator
],authLogin);

router.post('/logout', authLogout);




module.exports = router;