const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');
//const Media = require('../models/Media');

const router = Router();

//CREAR MEDIA

router.post('/', [
    check ('serial', 'invalid.serial').not().isEmpty(),
    check ('titulo', 'invalid.titulo').not().isEmpty(),
    check ('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check ('urlpel', 'invalid.urlpel').not().isEmpty(),
    check ('foto', 'invalid.foto').not().isEmpty(),
    check ('anioestreno', 'invalid.anioestreno').not().isEmpty(),
    check ('genero', 'invalid.genero').not().isEmpty(),
    check ('director', 'invalid.director').not().isEmpty(),
    check ('productora', 'invalid.productora').not().isEmpty(),
    check ('tipo', 'invalid.tipo').not().isEmpty()

], async function(req, res) {

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({serial: req.body.serial });
        if(existeMediaPorSerial) {
            return res.status(400).send('Serial ya esta en uso');
        }


        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlpel = req.body.urlpel;
        media.foto = req.body.foto;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
        media.anioestreno = req.body.anioestreno;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;

        media = await media.save();

        res.send(media);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al crear media');
    } 
    });


//LISTAR GENEROS

router.get('/', async function (req, res){

    try {
        const medias = await Media.find().populate([
            {
                path:'genero', select: 'nombre estado'
            },
            {
                path:'director', select: 'nombre estado'
            },
            {
                path:'productora', select: 'nombre estado descripcion'
            },
            {
                path:'tipo', select: 'nombre descripcion'
            }

        ]);
        res.send(medias);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar media');
    }
});

//LISTAR PEL POR ID
router.get('/:mediaId', async function (req, res){

    try {
        const media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('Pelicula no existe');
        }
        res.send(media);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar Pelicula');
    }
});


module.exports = router;

    
    
    

