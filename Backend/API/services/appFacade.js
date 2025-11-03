const { sequelize } = require("../sequelize-config");
const Venda = require("../models/venda");
const ItemVenda = require("../models/itemVenda");
const Produto = require("../models/produto");
const notifier = require("../utils/notifier");

class AppFacade {
  static async createVendaWithItems(vendaData, itens) {
    return await sequelize.transaction(async (t) => {
      const venda = await Venda.create(vendaData, { transaction: t });

      for (const item of itens) {
        const produto = await Produto.findByPk(item.produto_id, { transaction: t });
        if (!produto) throw new Error(`Produto ${item.produto_id} não encontrado.`);
        if (produto.quantidade_estoque < item.quantidade)
          throw new Error(`Estoque insuficiente para o produto ${produto.nome}.`);

        await ItemVenda.create(
          { venda_id: venda.id, ...item },
          { transaction: t }
        );

        await produto.update(
          { quantidade_estoque: produto.quantidade_estoque - item.quantidade },
          { transaction: t }
        );

        if (produto.quantidade_estoque - item.quantidade === 0) {
          notifier.emit("stockZero", { produto_id: produto.id, nome: produto.nome });
        }
      }

      notifier.emit("vendaCreated", { venda_id: venda.id });
      return venda;
    });
  }

  static async getAllVendas() {
    return await Venda.findAll({ include: [ItemVenda] });
  }

  static async getVendaById(id) {
    return await Venda.findByPk(id, { include: [ItemVenda] });
  }
}

module.exports = AppFacade;
