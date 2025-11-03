const BaseService = require("./baseService");

class FeiranteService extends BaseService {
  async beforeCreate(data) {
    if (!data.email || !data.cpf) throw new Error("Email e CPF são obrigatórios.");
  }
}

module.exports = FeiranteService;