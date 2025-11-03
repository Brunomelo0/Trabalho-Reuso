const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");
const Venda = require("./venda");
const Produto = require("./produto");

const ItemVenda = sequelize.define("ItemVenda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  venda_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Venda, key: "id" } },
  produto_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produto, key: "id" } },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, {
  tableName: "item_venda",
  timestamps: false
});

Venda.hasMany(ItemVenda, { foreignKey: "venda_id", as: "itens" });
ItemVenda.belongsTo(Venda, { foreignKey: "venda_id", as: "venda" });

Produto.hasMany(ItemVenda, { foreignKey: "produto_id", as: "itens_venda" });
ItemVenda.belongsTo(Produto, { foreignKey: "produto_id", as: "produto" });

module.exports = ItemVenda;