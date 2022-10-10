
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { sequelize } = require('../database/conectionDB');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.postsPath = '/api/posts';
        this.uploadsPath = '/api/upload';

        // conectar DB
        this.conectarDB();

        // Migdlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

     // ================== Data Base ==================
     async conectarDB() {
        try {
            // await sequelize.authenticate();
            await sequelize.sync({ force: false } );
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

    // ================== middlewares ==================
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Read and parse of the body
        this.app.use( express.json() );

        // Public directory
        this.app.use( express.static( 'public') );

        // Files upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }
    // ================== routes ==================
    routes() {
        
        this.app.use( this.usersPath, require( '../routes/users' ) );
        this.app.use( this.authPath, require( '../routes/auth' ) );
        this.app.use( this.postsPath, require( '../routes/posts' ) );
        this.app.use( this.uploadsPath, require( '../routes/uploads' ) );

    }
    // ================== listen ==================
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        } );
    }
}


module.exports = Server;
