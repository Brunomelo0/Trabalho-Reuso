const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const Feira = sequelize.define("Feira", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT },
  localizacao: { type: DataTypes.TEXT, allowNull: false },
  data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  data_fim: { type: DataTypes.DATEONLY, allowNull: false },
  horario_inicio: { type: DataTypes.TIME, allowNull: false },
  horario_fim: { type: DataTypes.TIME, allowNull: false },
}, {
  tableName: "feira",
  timestamps: false
});

module.exports = Feira;