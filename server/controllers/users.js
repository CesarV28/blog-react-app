const { response, request } = require('express');



const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', page = 1, limit = 10, apikey} = req.query;

    res.json( {
        msg: 'Get API - Controlador',
        q,
        nombre,
        page,
        limit,
        apikey
    })
}

const usersPost = (req, res) => {
    
    const { nombre, edad } = req.body;

    res.json( {
        msg: 'Post API - Controlador',
        nombre,
        edad
    })
}

const usersPut = (req, res) => {

    const { id } = req.params;

    res.json( {
        msg: 'Put API - Controlador',
        id
    })
}

const usersDelete = (req, res) => {
    res.json( {
        msg: 'Delete API - Controlador'
    })
}

const usersPatch = (req, res) => {
    res.json( {
        msg: 'Patch API - Controlador'
    })
}




module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}