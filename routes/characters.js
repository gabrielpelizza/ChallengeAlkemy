const express = require('express');
const router = express.Router();

const {getAll, getById, create, update, associateCreate,associateUpdate, associateRemove, remove} = require('../controllers/charactersController')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', getAll); //---> devuelve todos los actores
router.post('/create',verifyToken, create); //---> permite crear un actor
router.get('/:id', verifyToken,getById); //---> devuelve el actor segun parametro
router.put('/update/:id',verifyToken,update);
router.delete('/delete/:id',verifyToken,remove);
router.post('/associate', verifyToken,associateCreate)
router.post('/associate/update',verifyToken, associateUpdate)
router.post('/assosiate/remove',verifyToken, associateRemove)

module.exports = router