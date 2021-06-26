module.exports = function(sequelize, dataTypes) {

    let alias = "Genero";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'el nombre del género no puede ser nulo'
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el nombre del género"
                }
            }

        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: true,

        },

    }

    let config = {
        tableName: "generos",
        timestamps: false,
        underscored: true
    }

    let Genre = sequelize.define(alias, cols, config)


    return Genre
}