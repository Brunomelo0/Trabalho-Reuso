const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");
const Feirante = require("./feirante");
const Feira = require("./feira");

const Venda = sequelize.define("Venda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  feirante_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Feirante, key: "id" } },
  feira_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Feira, key: "id" } },
  data_venda: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  valor_total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, {
  tableName: "venda",
  timestamps: false
});

Feirante.hasMany(Venda, { foreignKey: "feirante_id", as: "vendas" });
Venda.belongsTo(Feirante, { foreignKey: "feirante_id", as: "feirante" });

Feira.hasMany(Venda, { foreignKey: "feira_id", as: "vendas" });
Venda.belongsTo(Feira, { foreignKey: "feira_id", as: "feira" });

module.exports = Venda;