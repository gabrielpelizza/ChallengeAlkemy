const db = require('../database/models'); //requiero la base de datos
const { Op } = require('sequelize');
const getUrl = (req) => req.protocol +'://'+ req.get('host') + req.originalUrl

module.exports = {
    getAll: function(req, res) {
        if(Object.keys(req.query).length === 0){
            db.Personaje.findAll()
            .then(characters => {
                characterArray = []
                characters.forEach(character => {
                    characterFilter = {
                        id : character.id,
                        imagen: character.imagen,
                        nombre: character.nombre,
                    }
                    characterArray.push(characterFilter)
                });
                let response = {
                    meta: {
                        link: getUrl(req),
                        status: 200,
                        cantidad: characters.length
                    },
                    data: characterArray
                }
                return res.status(200).json(response)
            })
            .catch(error => res.status(404).send({
                meta:{
                    status: 404,
                    msg: error,
                }
            }))
        }
        else {
            switch (true) {
                case req.query.name != undefined && req.query.name.length != 0:
                    db.Personaje.findAll({
                        where:{
                            nombre:{
                                [Op.like]: `%${req.query.name}%`
                            }
                        }
                    })
                    .then(characters => {
                        characterArray = []
                        characters.forEach(character => {
                            characterFilter = {
                                id : character.id,
                                imagen: character.imagen,
                                nombre: character.nombre,
                            }
                            characterArray.push(characterFilter)
                        });
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200,
                                cantidad: characters.length
                            },
                            data: characterArray
                        }
                        return res.status(200).json(response)
                    })
                    .catch(error => res.status(404).send({
                        meta:{
                            status: 404,
                            msg: error,
                        }
                    }))
                    
                    break;
                case req.query.age != undefined && req.query.age.length != 0:
                    db.Personaje.findAll({
                        where:{
                            edad:{
                                [Op.like]: `%${req.query.age}%`
                            }
                        }
                    })
                    .then(characters => {
                        characterArray = []
                        characters.forEach(character => {
                            characterFilter = {
                                id : character.id,
                                imagen: character.imagen,
                                nombre: character.nombre,
                            }
                            characterArray.push(characterFilter)
                        });
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200,
                                cantidad: characters.length
                            },
                            data: characterArray
                        }
                        return res.status(200).json(response)
                    })
                    .catch(error => res.status(404).send({
                        meta:{
                            status: 404,
                            msg: error,
                        }
                    }))
                    break;
                default:
                    res.status(404).json({
                        meta:{
                            status: 404,
                            msg: "el query ingresado es invalido o se encuentra vacio",
                        }
                    })
                    break;
            }
        }
        
    },
    getById: function(req, res) {
            if (req.params.id % 1 !== 0) {
                let response = {
                    meta: {
                        status: 400,
                        msg: 'ID incorrecto'
                    }
                }
                return res.status(404).json(response)
            } else {
                db.Personaje.findByPk(req.params.id,{
                    include : [
                        {
                          model: db.Pelicula,
                          as: "peliculas",
                          through: {
                            attributes: ["id","personaje_id", "pelicula_id"],
                          }
                        }
                      ]
                })
                .then(character => {
                    if (character) {
                        movieFilter = []
                        personajeFilter = {
                            imagen: character.imagen,
                            nombre: character.nombre,
                            edad: character.edad,
                            peso: character.peso,
                            historia:character.historia,
                            pelicula:movieFilter  
                        }
                        
                        character.peliculas.forEach(a => {
                            let movie = {
                                titulo:a.titulo
                            }
                            movieFilter.push(movie)
                        })
    
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200
                            },
                            data: personajeFilter
                        }
                        return res.status(200).json(response)
                    } else {
                        let response = {
                            meta: {
                                status: 404,
                                msg: 'ID no encontrado'
                            }
                        }
                        return res.status(404).json(response)
                    }
                })
                .catch(error => res.status(400).json({
                    meta: {
                        status: 400,
                        msg: error
                    }
                }))
            }
    },
    create: function(req, res) {
        db.Personaje.create({
                imagen : req.body.imagen,
                nombre: req.body.nombre,
                edad: req.body.edad,
                peso: req.body.peso,
                historia: req.body.historia
            })
            .then(function(result) {
                return res.status(201).json({
                    meta: {
                        status: 201,
                        msg: "el personaje se agrego correctamente",
                    },
                    data: result
                })
            })
            .catch(function(err) {
                return res.status(400).send(err)
            })
    },
    update : function(req,res){
        db.Personaje.update({
            imagen : req.query.imagen,
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
                meta:{
                    status:201,
                    msg: "el personaje se actualizo correctamente"
                }
            })
        })
        .catch(error => res.status(400).json({
            data:{
                status:400,
                msg: error
            }
        }))
    },
    remove : function(req,res){
      
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
                    meta:{
                        status:201,
                        msg: "el personaje se elimino correctamente"
                    }
                })
            })
            .catch(error => res.status(400).json({
                meta:{
                    status:400,
                    msg: "el personaje no se puedo eliminar",
                    error: error
                }
            }))
        )
       
    },
    associateCreate: (req,res)=>{
        db.Personaje_pelicula.create({
            personaje_id: req.body.personajeId,
            pelicula_id : req.body.peliculaId
        })
        .then(associate => {
            response = {
                meta: {
                    status: 201,
                    msg: "la asociacion se realizo correctamente"
                },
                data: associate
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json({
            meta:{
                status:500,
                msg: "no se pudo realizar la asociacion",
                error: error
            }
        }))
    },
    associateUpdate:(req,res)=>{
        db.Personaje_pelicula.update({
            personaje_id: req.body.personajeId,
            pelicula_id: req.body.peliculaId
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(associate => {
            response = {
                meta: {
                    link: getUrl(req),
                    status: 201,
                    msg: "la asociacion se modifico correctamente"
                },
                data: associate
            }
            return res.status(201).json(response)
        })
        .catch(error => res.status(500).json({
            meta:{
                status: 500,
                msg: error
            }
        }))
    },
    associateRemove:(req,res)=>{
        db.Personaje_pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(associate => {
            response = {
                meta: {
                    link: getUrl(req),
                    status: 201,
                    state: "la asociacion se elimino correctamente"
                },
                data: associate
            }
            return res.status(201).json(response)
        })
        .catch(error => res.status(500).json({
            meta:{
                status:500,
                msg: error
            }
        }))
    }

}