const express = require('express');
const router = express.Router();

const {getAll, create, getById, update, remove} = require('../controllers/genresController')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', getAll); 
router.get('/:id',getById);
router.post('/create',verifyToken, create); 
router.put('/update/:id',verifyToken,update); 
router.delete('/delete/:id',verifyToken,remove);

module.exports = router