const { Router } = require('express');
const { check } = require('express-validator');

const { 
    authRegister,
    authLogin,
    authLogout,
    revalidateToken
} = require('../controllers/auth');

const { emailExists } = require('../helpers/db-validators');

const { fieldsValidator } = require('../middleware/fields-validator');
const { validateJWT } = require('../middleware/validate-JWT');

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

router.get('/renew', [
    validateJWT
], revalidateToken);


module.exports = router;