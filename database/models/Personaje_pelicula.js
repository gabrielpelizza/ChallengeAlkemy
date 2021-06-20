module.exports = function(sequelize, dataTypes) {

    let alias = "personaje_pelicula";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },

        personaje_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        pelicula_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
    }

    let config = {
        tableName: "personaje_pelicula",
        timestamps: false,
        underscored: true
    }

    let Charmovie = sequelize.define(alias, cols, config)

    Charmovie.associate = function(models){
        Charmovie.belongsTo(models.Pelicula,{
            as : 'pelicula',
            foreignKey : 'pelicula_id'
        })
    }
    Charmovie.associate = function(models){
        Charmovie.belongsTo(models.Personaje,{
            as : 'personaje',
            foreignKey : 'personaje_id'
        })
    }

    return Charmovie
}