const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull:false },
  senha: { type: DataTypes.TEXT, allowNull:false }
}, {
  tableName: "usuario",
  timestamps: false
});

module.exports = Usuario;