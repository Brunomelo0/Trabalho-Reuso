const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");
const Feirante = require("./feirante");

const Produto = sequelize.define("Produto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  feirante_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Feirante, key: "id" } },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT },
  preco: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  quantidade_estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  categoria: { type: DataTypes.STRING(50) },
}, {
  tableName: "produto",
  timestamps: false
});

Feirante.hasMany(Produto, { foreignKey: "feirante_id", as: "produtos" });
Produto.belongsTo(Feirante, { foreignKey: "feirante_id", as: "feirante" });

module.exports = Produto;