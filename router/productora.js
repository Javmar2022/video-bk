const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();


//CREAR PRODUCTORAS

router.post('/', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('slogan', 'invalid.slogan').not().isEmpty(),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),


], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let productora = new Productora();
            productora.nombre = req.body.nombre;
            productora.estado = req.body.estado;
            productora.slogan = req.body.slogan;
            productora.descripcion = req.body.descripcion;
            productora.fechaCreacion = new Date;
            productora.fechaActualizacion = new Date;

            productora = await productora.save();

            res.send(productora);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al crear productora');
    } 
    });

//MODIFICAR PRODUCTORA 

router.put('/:productoraId', [
    check ('nombre', 'invalid.nombre').not().isEmpty(),
    check ('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    check ('slogan', 'invalid.slogan').not().isEmpty(),
    check ('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let productora= await Productora.findById(req.params.productoraId);
        if(!productora) {
            return res.status(400).send('Productora no existe');
        }
 
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaActualizacion = new Date;

        productora = await productora.save();

        res.send(productora);

    } catch (error) {

        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar productora');
    } 
    });


//LISTAR PRODUCTORAS

router.get('/', async function (req, res){

    try {
        const productoras = await Productora.find();
        res.send(productoras);


    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al listar productoras');
    }
})

module.exports = router;