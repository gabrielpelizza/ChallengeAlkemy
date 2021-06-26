var express = require('express');
var router = express.Router();

const {getMovies,getById,create,update,remove, associateCreate, associateUpdate, associateRemove} = require('../controllers/moviesController');

const verifyToken = require('../middlewares/verifyToken')


router.get('/', getMovies); //---> devuelve todas las peliculas
router.get('/:id', getById); //---> devuelve una pelicula segun parametro
router.post('/create', verifyToken, create); //---> permite crear una pelicula
router.put('/update/:id', verifyToken, update); //--->  actualiza los datos de la pelicula
router.delete('/delete/:id', verifyToken,remove); //---> elimina una pelicula*/
router.post('/associate', verifyToken,associateCreate)
router.post('/associate/update',verifyToken, associateUpdate)
router.post('/assosiate/remove',verifyToken, associateRemove)


module.exports = router;
