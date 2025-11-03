const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const Feirante = sequelize.define("Feirante", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  telefone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  endereco: { type: DataTypes.TEXT },
  data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "feirante",
  timestamps: false
});

module.exports = Feirante;