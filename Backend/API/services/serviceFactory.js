// Factory para criação de services por entidade

const Feira = require("../models/feira");
const Feirante = require("../models/feirante");
const Estande = require("../models/estande");
const Produto = require("../models/produto");
const FeiraService = require("./feiraService");
const FeiranteService = require("./feiranteService");
const EstandeService = require("./estandeService");
const ProdutoService = require("./produtoService");

class ServiceFactory {
  static createService(name) {
    switch (name) {
      case "Feira": return new FeiraService(Feira);
      case "Feirante": return new FeiranteService(Feirante);
      case "Estande": return new EstandeService(Estande);
      case "Produto": return new ProdutoService(Produto);
      default:
        throw new Error(`Service não encontrado: ${name}`);
    }
  }
}

module.exports = ServiceFactory;
