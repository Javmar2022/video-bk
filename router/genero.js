const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();


//CREAR GENEROS

router.post('/', [
    check ('nombre', 'invalid.nombre').isIn([ 'Accion', 'Aventura','Drama', 'Ciencia Ficcion','Terror']),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let genero = new Genero();
            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;
            genero.fechaCreacion = new Date;
            genero.fechaActualizacion = new Date;

            genero = await genero.save();

            res.send(genero);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al crear usuario');
    } 
    });

//MODIFICAR GENERO 

router.put('/:generoId', [
    check ('nombre', 'invalid.nombre').isIn([ 'Accion', 'Aventura','Drama', 'Ciencia Ficcion','Terror']),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId);
        if(!genero) {
            return res.status(400).send('Usuario no existe');
        }
 
        //let genero = new Genero();
            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;
            //genero.fechaCreacion = new Date;
            genero.fechaActualizacion = new Date;

            genero = await genero.save();

            res.send(genero);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar genero');
    } 
    });


//LISTAR GENEROS

router.get('/', async function (req, res){

    try {
        const generos = await Genero.find();
        res.send(generos);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar generos');
    }
})

module.exports = router;
