const { request } = require("express");
const { Post } = require("../models/post");
const { User } = require("../models/user");


const postsGet = async( req = request, res) => {

    const {category} = req.query;
 
    try {
        
        // if there is a category
        // if( category ) {
        //     const posts  = await Post.findAll({
        //         where:{
        //             category
        //         },
        //         include: [{
        //             model: User,
        //             attributes: { exclude: ['password'] }
        //         }]
        //     });
        //     return res.json({
        //         posts
        //     });
        // }
        
        // if there isn't
        const posts  = await Post.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password', 'email'] } // excluding atributes
            }]
        });
    
        res.json({
            msg: 'It is works',
            posts,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}

const postGet = async( req, res) => {

    const {id} = req.params;

    try {
        const post = await Post.findOne({
            where: {
                id
            },
            include: [{
                model: User,
                attributes: ['username', 'img']// including atributes
            }]
        });

        if( !post ){
            return res.status(404).json({
                msg: 'Post no encontrado'
            });
        }
    
        res.status(200).json({
            post
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}

const postsPut = async( req, res) => {

    const { id } = req.params;
    const data = req.body;

    const post = await Post.findOne({
        where: {
            id
        }
    });

    if( !post ){
        return res.status(404).json({
            msg: 'No se encontro el post'
        });
    }

    if( !data.img ){
        data.img = post.img;
    }

    post.update({ ...data }, {
        where: {
          id
        }
      });

    res.json({
        msg: 'post actualizado'
    })
}

const postsPost = async( req, res) => {

    const postData = req.body;
    const { id } = req.user;

    data = { 
        userId: id, 
        date: new Date(),
        ...postData
    };

    try {

        const post = new Post({ ...data });
        
        await post.save();

        res.status(201).json({
            msg: 'Post añadido'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}

const postsDelete = async( req, res) => {
    const { id } = req.params;

    try {

        await Post.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            msg: 'El post ha sido eliminado.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }
}


module.exports = {
    postsGet,
    postGet,
    postsPut,
    postsPost,
    postsDelete,
}