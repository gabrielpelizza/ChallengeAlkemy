module.exports = function(sequelize, dataTypes) {

    let alias = "Pelicula";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        imagen: {
            type: dataTypes.STRING(45),
            allowNull: true,
        },
        titulo: {
            type: dataTypes.STRING(45),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo titulo no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el titulo de la película"
                }
            }
        },
        fecha_de_creacion: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo fecha de cracion no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que indicar la fecha de cracion de la película"
                }
            }
        },
        clasificacion: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo clasificacion no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir la clasificacion de la película"
                }
            }
        },
        genero_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : true
        }
    }

    let config = {
        tableName: "peliculas",
        timestamps: false,
        underscored: true
    }

    let Movie = sequelize.define(alias, cols, config)


    Movie.associate = function(models){
       
        Movie.belongsTo(models.Genero,{
            as : 'generos',
            foreignKey : 'genero_id'
        }) 

        Movie.belongsToMany(models.Personaje,{
            as : "personajes",
            through : "Personaje_pelicula",
            foreignkey : "pelicula_id",
            otherKey : "personaje_id"
        })
    } 

    

    return Movie
}