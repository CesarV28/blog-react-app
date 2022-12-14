
const { Router } = require('express');

// Controllers
const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch 
    } = require('../controllers/users');

const router = Router();


router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', usersPost);

router.delete('/:id', usersDelete);

router.patch('/', usersPatch);



module.exports = router;
