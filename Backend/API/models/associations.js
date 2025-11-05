const Feira = require("./feira");
const Estande = require("./estande");
const Venda = require("./venda");
const Produto = require("./produto");
const ItemVenda = require("./itemVenda");

Feira.hasMany(Estande, { foreignKey: "feira_id", as: "estandes" });
Estande.belongsTo(Feira, { foreignKey: "feira_id", as: "feira" });

Estande.hasMany(Venda, { foreignKey: "estande_id", as: "vendas" });
Venda.belongsTo(Estande, { foreignKey: "estande_id", as: "estande" });

Venda.hasMany(ItemVenda, { foreignKey: "venda_id", as: "itens" });
ItemVenda.belongsTo(Venda, { foreignKey: "venda_id", as: "venda" });

Produto.hasMany(ItemVenda, { foreignKey: "produto_id", as: "itens_venda" });
ItemVenda.belongsTo(Produto, { foreignKey: "produto_id", as: "produto" });

module.exports = {
  Feira,
  Estande,
  Venda,
  Produto,
  ItemVenda,
};
