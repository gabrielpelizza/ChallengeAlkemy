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
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo nombre no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el nombre del personaje"
                }
            }
        },
        edad: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo edad no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que indicar la edad del personaje"
                }
            }
        },
        peso: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo peso no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el peso del personaje"
                }
            }
        },
        pelicula_id : {
            type : dataTypes.INTEGER.UNSIGNED
        }
    }

    let config = {
        tableName: "personajes",
        timestamps: false,
        underscored: true
    }

    let Character = sequelize.define(alias, cols, config)

    return Character
}