const db = require('../database/models'); //requiero la base de datos

module.exports = {
    getAll: function(req, res) {
        db.Personaje.findAll()
            .then(characters => {
                characterarray = []
                characters.forEach(character => {
                    character.setDataValue("link", getUrl(req) + '/' + character.id)
                    characterFilter = {
                        imagen : character.imagen,
                        nombre : character.nombre
                    }
                    characterarray.push(characterfilter)
                });
                
                return res.status(200).json(characterarray)
            })
            .catch(error => res.status(404).send(error))
    },
    getById: function(req, res) {
        db.Personaje.findByPk(req.params.id)
            .then(function(personaje) {
                return res.status(200).json(personaje)
            })
    },
    create: function(req, res) {
        db.Personaje.create({
                nombre: req.body.nombre,
                edad: req.body.edad,
                peso: req.body.peso,
                historia: req.body.historia
            })
            .then(function(result) {
                return res.status(201).json(result)
            })
            .catch(function(err) {
                return res.status(400).send(err)
            })
    },
    update : function(req,res){
        db.Personaje.update({
            nombre: req.body.nombre,
            edad: req.body.edad,
            peso: req.body.peso,
            historia: req.body.historia
        },
        {
            where: {
                id : req.params.id
            }
        })
        .then(function() {
            return res.status(201).json({
                msg : "Actualización exitosa"
            })
        })
        .catch(err => res.status(400).send(err))
    },
    delete : function(req,res){
      
        db.Personaje_pelicula.destroy({
            where : {
                personaje_id : req.params.id
            }
        })
        .then( 
            db.Personaje.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then(function() {
                return res.status(201).json({
                    msg : "Persoaje eliminado"
                })
            })
            .catch(err => res.status(400).send(err))
        )
       
    }

}