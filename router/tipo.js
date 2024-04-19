const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();


//CREAR DIRECTOR

router.post('/', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    //check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = new Tipo();
            tipo.nombre = req.body.nombre;
            //director.estado = req.body.estado;
            tipo.descripcion = req.body.descripcion;
            tipo.fechaCreacion = new Date;
            tipo.fechaActualizacion = new Date;

            tipo = await tipo.save();

            res.send(tipo);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al crear tipo');
    } 
    });

//MODIFICAR DIRECTOR 

router.put('/:tipoId', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    //check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if(!tipo) {
            return res.status(400).send('Tipo no existe');
        }
 
        //let genero = new Genero();
            tipo.nombre = req.body.nombre;
            tipo.estado = req.body.estado;
            tipo.descripcion = req.body.descripcion;
            //genero.fechaCreacion = new Date;
            tipo.fechaActualizacion = new Date;

            tipo = await tipo.save();

            res.send(tipo);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar tipo');
    } 
    });


//LISTAR TIPOS

router.get('/', async function (req, res){

    try {
        const tipos = await Tipo.find();
        res.send(tipos);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar tipos');
    }
})

module.exports = router;