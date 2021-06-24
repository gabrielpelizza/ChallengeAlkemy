module.exports = function(sequelize, dataTypes) {

  let alias = "Users";

  let cols = {
      id: {
          type: dataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
      },
      email: {
        type :  dataTypes.STRING(150),
        allowNull : false,
        validate : {
          notNull : {
            msg : 'El campo no puede ser nulo'
          },
          notEmpty : {
            msg : 'El campo email es obligatorio'
          },
          isEmail : {
            msg : 'Debe ser un email válido'
          }
        }
      },
      pass: {
        type :  dataTypes.STRING(150),
        allowNull : false,
        validate : {
          notNull : {
            msg : 'El campo no puede ser nulo'
          },
          notEmpty : {
            msg : 'El campo contraseña es obligatorio'
          }
        }
      }
  }

  let config = {
      tableName: "usuarios",
      timestamps: false,
      underscored: true
  }

  let Users = sequelize.define(alias, cols, config)

  return Users
}