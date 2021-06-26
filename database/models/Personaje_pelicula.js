module.exports = function(sequelize, dataTypes) {

    let alias = "Personaje_pelicula";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        personaje_id : {
            type : dataTypes.INTEGER
        },
        pelicula_id : {
            type : dataTypes.INTEGER
        },
    }

    let config = {
        tableName: "personaje_pelicula",
        timestamps: false,
        underscored: true
    }

    let Charmovie = sequelize.define(alias, cols, config)


    return Charmovie
}