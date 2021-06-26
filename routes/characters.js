const express = require('express');
const router = express.Router();

const {getAll, getById, create, update,associateUpdate, associateRemove, remove} = require('../controllers/charactersController')

router.get('/', getAll); //---> devuelve todos los actores
router.post('/create', create); //---> permite crear un actor
router.get('/:id', getById); //---> devuelve el actor segun parametro
router.put('/update/:id',update);
router.delete('/delete/:id',remove);
router.post('/associate', verifyToken,associateCreate)
router.post('/associate/update',verifyToken, associateUpdate)
router.post('/assosiate/remove',verifyToken, associateRemove)

module.exports = router