const db = require('../database/models');
const { Op } = require('sequelize');

const getUrl = (req) => req.protocol +'://'+ req.get('host') + req.originalUrl
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    getMovies: function (req, res) {
            if(Object.keys(req.query).length === 0){
                db.Pelicula.findAll()
                .then(movies => {
                    moviearray = []
                    movies.forEach(movie => {
                        movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                        moviefilter = {
                            id : movie.id,
                            titulo : movie.titulo,
                            imagen : movie.imagen,
                            fecha_de_creacion : movie.fecha_de_creacion
                        }
                        moviearray.push(moviefilter)
                    });
                    
                    console.log(moviearray)

                    let response = {
                        meta: {
                            link: getUrl(req),
                            status: 200,
                            cantidad: movies.length
                        },
                        data: moviearray
                    }
                    return res.status(200).json(response)
                })
                .catch(error => res.status(404).send(error))
            }
            else{
                switch (true) {
                    case req.query.order === "DESC":
                        db.Pelicula.findAll({
                            order:[
                                ["titulo","DESC"]
                            ]
                        })
                        .then(movies => {
                            moviearray = []
                            movies.forEach(movie => {
                                movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                                moviefilter = {
                                    id : movie.id,
                                    titulo : movie.titulo,
                                    imagen : movie.imagen,
                                    fecha_de_creacion : movie.fecha_de_creacion
                                }
                                moviearray.push(moviefilter)
                            });
                            
                            console.log(moviearray)
        
                            let response = {
                                meta: {
                                    link: getUrl(req),
                                    status: 200,
                                    cantidad: movies.length
                                },
                                data: moviearray
                            }
                            return res.status(200).json(response)
                        })
                        .catch(error => res.status(404).send(error))
                        break;
                    case req.query.order === "ASC":
                        db.Pelicula.findAll({
                            order:[
                                ["titulo","ASC"]
                            ]
                        })
                        .then(movies => {
                            moviearray = []
                            movies.forEach(movie => {
                                movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                                moviefilter = {
                                    id : movie.id,
                                    titulo : movie.titulo,
                                    imagen : movie.imagen,
                                    fecha_de_creacion : movie.fecha_de_creacion
                                }
                                moviearray.push(moviefilter)
                            });
                            
                            console.log(moviearray)
        
                            let response = {
                                meta: {
                                    link: getUrl(req),
                                    status: 200,
                                    cantidad: movies.length
                                },
                                data: moviearray
                            }
                            return res.status(200).json(response)
                        })
                        .catch(error => res.status(404).send(error))
                        break;
                    case req.query.name != undefined && req.query.name.length != 0:
                        db.Pelicula.findAll({
                            where:{
                                titulo:{
                                    [Op.like]: `%${req.query.name}%`
                                }
                            }
                        })
                        .then(movies => {
                            moviearray = []
                            movies.forEach(movie => {
                                movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                                moviefilter = {
                                    id : movie.id,
                                    titulo : movie.titulo,
                                    imagen : movie.imagen,
                                    fecha_de_creacion : movie.fecha_de_creacion
                                }
                                moviearray.push(moviefilter)
                            });
                            
                            console.log(moviearray)
        
                            let response = {
                                meta: {
                                    link: getUrl(req),
                                    status: 200,
                                    cantidad: movies.length
                                },
                                data: moviearray
                            }
                            return res.status(200).json(response)
                        })
                        .catch(error => res.status(404).send(error))
                        console.log(req.query.name)
                        break;
                        
                    case req.query.genre != undefined:
                        db.Pelicula.findAll({
                            where:{
                                genero_id: req.query.genre
                            }
                        })
                        .then(movies => {
                            moviearray = []
                            movies.forEach(movie => {
                                movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                                moviefilter = {
                                    id : movie.id,
                                    titulo : movie.titulo,
                                    imagen : movie.imagen,
                                    fecha_de_creacion : movie.fecha_de_creacion
                                }
                                moviearray.push(moviefilter)
                            });
        
                            let response = {
                                meta: {
                                    link: getUrl(req),
                                    status: 200,
                                    cantidad: movies.length
                                },
                                data: moviearray
                            }
                            return res.status(200).json(response)
                        })
                        .catch(error => res.status(404).send(error))
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
    getById: function (req, res) {
        if (req.params.id % 1 !== 0) {
            let response = {
                meta: {
                    status: 400,
                    msg: 'ID incorrecto'
                }
            }
            return res.status(404).json(response)
        } else {
            db.Pelicula.findByPk(req.params.id,{
                include : [
                    {
                      model: db.Personaje,
                      as: "personajes",
                      through: {
                        attributes: ["id","personaje_id", "pelicula_id"],
                      }
                    }
                  ]
            })
            .then(movie => {
                if (movie) {
                    personajeFilter = []
                    movieFilter = {
                        imagen: movie.imagen,
                        titulo : movie.titulo,
                        fecha_de_creacion:movie.fecha_de_creacion,
                        clasificacion:movie.genero_id,
                        genero_id:movie.genero_id,
                        personajes:personajeFilter
                    }
                    
                    movie.personajes.forEach(a => {
                        let personajes = {
                            nombre:a.nombre
                        }
                        personajeFilter.push(personajes)
                    })

                    let response = {
                        meta: {
                            link: getUrl(req),
                            status: 200
                        },
                        data: movieFilter
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
            .catch(error => res.status(400).send(error))
        }

    },
    create: function (req, res) {
     
        const { imagen, titulo, fecha_de_creacion, clasificacion, genero_id } = req.body
        db.Pelicula.create({
            imagen,
            titulo,
            fecha_de_creacion,
            clasificacion,
            genero_id,
        })
        .then(movie => {
            return res.status(201).json({
                link: getBaseUrl(req) + '/movies/' + movie.id,
                msg: "Pelicula añadida con éxito"
            })
        })
        .catch(error => {
            switch (error.name) {
                case "SequelizeValidationError":
                    let erroresMsg = [];
                    let erroresNotNull = [];
                    let erroresValidation = [];
                    error.errors.forEach(error => {
                        erroresMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            erroresNotNull.push(error.message)
                        }
                        if (error.type == "Validation error") {
                            erroresValidation.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        messages: "datos faltantes o erróneos",
                        errores: {
                            cantidad: erroresMsg.length,
                            msg: erroresMsg,
                            notNull: erroresNotNull,
                            validation: erroresValidation
                        }
                    }
                    return res.status(400).json(response)
                default:
                    return res.status(500).json({error})
            }
        })
    },
    update: (req,res)=>{
        const { imagen, titulo, fecha_de_creacion, clasificacion, genero_id } = req.body

        db.Pelicula.update({
            imagen,
            titulo,
            fecha_de_creacion,
            clasificacion,
            genero_id,
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                if (result[0]) {
                    console.log(result)
                    return res.status(201).json({
                        msg: "Actualización exitosa"
                    })
                } else {
                    return res.status(200).json({
                        msg: "No se hicieron cambios"
                    })
                }
            })
            .catch(err => res.status(500).json(err))
    },
    remove: (req,res)=>{
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result) {
                return res.status(200).json({
                    msg: "Pelicula eliminada"
                })
            } else {
                return res.status(200).json({
                    msg: "No se hicieron cambios"
                })
            }

        })
        .catch(err => res.status(500).json(err))
    },
    associateCreate: (req,res)=>{
        db.Personaje_pelicula.create({
            personaje_id: req.body.personajeId,
            pelicula_id : req.body.peliculaId
        })
        .then(associate => {
            response = {
                meta: {
                    link: getUrl(req),
                    status: 200,
                    state: "la asociacion se realizo correctamente"
                },
                data: associate
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json({
            error:error
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
                    status: 200,
                    state: "la asociacion se modifico correctamente"
                },
                data: associate
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json({
            error:error
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
                    status: 200,
                    state: "la asociacion se elimino correctamente"
                },
                data: associate
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json({
            error:error
        }))
    }

}