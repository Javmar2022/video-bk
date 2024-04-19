const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();


//CREAR DIRECTOR

router.post('/', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    //check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = new Director();
            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            //genero.descripcion = req.body.descripcion;
            director.fechaCreacion = new Date;
            director.fechaActualizacion = new Date;

            director = await director.save();

            res.send(director);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al crear director');
    } 
    });

//MODIFICAR DIRECTOR 

router.put('/:directorId', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    //check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if(!director) {
            return res.status(400).send('Director no existe');
        }
 
        //let genero = new Genero();
            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            //director.descripcion = req.body.descripcion;
            //genero.fechaCreacion = new Date;
            director.fechaActualizacion = new Date;

            director = await director.save();

            res.send(director);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar director');
    } 
    });


//LISTAR DIRECTORES

router.get('/', async function (req, res){

    try {
        const directores = await Director.find();
        res.send(directores);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar directores');
    }
})

module.exports = router;
