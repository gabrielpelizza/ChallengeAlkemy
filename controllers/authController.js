require('dotenv').config()

const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyData = (email,pass,res) => {
    if(!email || !pass){
        return res.status(401).json({
            status : 401,
            auth : false,
            msg : 'Debes ingresar email y constraseña (pass)'
        })
    }
}
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    index : (req,res)=>{
        res.status(200).json({
            register : {
                endpoint : getBaseUrl(req) + '/register',
                method : 'POST',
                columns : {
                    email : 'string',
                    pass : 'string'
                }
            },
            login : {
                endpoint : getBaseUrl(req) + '/login',
                method : 'POST', 
                columns : {
                    email : 'string',
                    pass : 'string'
                }
            },
            movies : {
                all : {
                    endpoint : getBaseUrl(req) + '/movies/',
                    method : 'GET'
                },
                one : {
                    endpoint : getBaseUrl(req) + '/movies/{id}',
                    method : 'GET'
                },
                create : {
                    endpoint : getBaseUrl(req) + '/movies/create',
                    method : 'POST',
                    columns : {
                        title : 'string(500)',
                        rating : 'decimal(3,1) UNSIGNED',
                        awards : 'integer UNSIGNED (opcional)',
                        release_date : 'datetime',
                        length : 'integer UNSIGNED (opcional)',
                        genre_id : 'integer (opcional)'
                    }
                },
                update : {
                    endpoint : getBaseUrl(req) + '/movies/update/{id}',
                    method : 'PUT'
                },
                delete : {
                    endpoint : getBaseUrl(req) + '/movies/delete/{id}',
                    method : 'DELETE'
                },
                
            },
            genres : {
                all : {
                    endpoint : getBaseUrl(req) + '/genres',
                method : 'GET'
                },
                one : {
                    endpoint : getBaseUrl(req) + '/genres/{id}',
                    method : 'GET'
                },
                create : {
                    endpoint : getBaseUrl(req) + '/genres/create',
                    method : 'POST',
                    columns : {
                        name : 'string(100)',
                        ranking : 'INTEGER(10) UNSIGNED UNIQUE',
                        active : 'integer UNSIGNED (opcional)'
                    }
                },
                update : {
                    endpoint : getBaseUrl(req) + '/genres/update/{id}',
                    method : 'PUT'
                },
                delete : {
                    endpoint : getBaseUrl(req) + '/genres/delete/{id}',
                    method : 'DELETE'
                },
            }
        })
    },
    register : (req,res) => {
        const {email, pass} = req.body;
        
        verifyData(email,pass,res)

        db.Users.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(user) {
                return res.status(401).json({
                    status : 401,
                    auth : false,
                    msg : 'El email ya se encuentra registrado'
                })
            }
        })
        .catch(error => res.status(500).json({
            msg : error
        }))
        
        db.Users.create({
            email,
            pass : bcrypt.hashSync(req.body.pass,12)
        })
        .then(user => {
            const token = jwt.sign(
                {
                    id:user.id
                },
                process.env.SECRET,
                {
                    expiresIn:60 * 60 * 24//24 horas
                }
                )
          return res.status(200).json({
                    status : 200,
                    auth : true,
                    token : token
                })
        })
        .catch(error => res.status(500).json(error))
    },
    login : (req,res) => {
        const {email, pass} = req.body

        verifyData(email,pass,res)

        db.Users.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if (!user || !bcrypt.compareSync(pass, user.pass)){
                return res.status(401).json({
                            auth : false,
                            msg : "credenciales inválidas"
                        })
            }
            const token = jwt.sign(
                {
                    id:user.id
                },
                process.env.SECRET,
                {
                    expiresIn:60 * 60 * 24
                })

            return res.status(200).json({
                        status : 200,
                        auth  : true,
                        token : token
                    })
        })
    },
}
