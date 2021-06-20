module.exports = function(sequelize, dataTypes) {

    let alias = "Personaje";

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
                    msg: "El campo title no puede ser nulo"
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
                    msg: "El campo release_date no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que indicar la fecha de estreno de la película"
                }
            }
        },
        clasificacion: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo rating no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el rating de la película"
                }
            }
        },
        genero_id : {
            type : dataTypes.INTEGER.UNSIGNED
        }
    }

    let config = {
        tableName: "peliculas",
        timestamps: false,
        underscored: true
    }

    let Character = sequelize.define(alias, cols, config)

    return Character
}