const BaseService = require("./baseService");

class ProdutoService extends BaseService {
  async beforeCreate(data) {
    if (data.preco < 0) throw new Error("Preço não pode ser negativo.");
    if (data.quantidade_estoque < 0) throw new Error("Estoque não pode ser negativo.");
  }
}

module.exports = ProdutoService;
