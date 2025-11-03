const BaseService = require("./baseService");

class EstandeService extends BaseService {
  async beforeCreate(data) {
    if (!data.feira_id) throw new Error("Estande deve estar associado a uma feira.");
  }
}

module.exports = EstandeService;
