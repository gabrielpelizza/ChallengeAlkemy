const db = require('../database/models');
const { Op } = require('sequelize');

const getUrl = (req) => req.protocol +'://'+ req.get('host') + req.originalUrl
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    getAll: function (req, res) {
        db.Pelicula.findAll({
            include : [
                {association : 'genero'},
                {association : 'actores'}
            ]
        })
            .then(movies => {
                movies.forEach(movie => {
                    movie.setDataValue("link", getUrl(req) + '/' + movie.id)
                });
                let response = {
                    meta: {
                        link: getUrl(req),
                        status: 200,
                        cantidad: movies.length
                    },
                    data: movies
                }
                return res.status(200).json(response)
            })
            .catch(error => res.status(404).send(error))
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
            db.Pelicula.findOne({
                where : {
                    id: req.params.id
                },
                include : [
                    {association :'generos'},
                    {association : 'personajes'}
                ]
            })
                .then(movie => {
                    if (movie) {
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200
                            },
                            data: movie
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
     
        const { titulo, fecha_de_creacion, clasificacion, genero_id } = req.body
        db.Pelicula.create({
            titulo,
            fecha_de_creacion,
            clasificacion,
            genero_id,
        })
        .then(movie => {
            return res.status(201).json({
                link: getBaseUrl(req) + '/api/movies/' + movie.id,
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
    }

}