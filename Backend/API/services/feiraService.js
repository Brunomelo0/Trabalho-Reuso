const BaseService = require("./baseService");

class FeiraService extends BaseService {
  async beforeCreate(data) {
    if (new Date(data.data_inicio) > new Date(data.data_fim)) {
      throw new Error("A data de início não pode ser posterior à data de fim.");
    }
  }

  async beforeUpdate(instance, data) {
    if (data.data_inicio && data.data_fim && new Date(data.data_inicio) > new Date(data.data_fim)) {
      throw new Error("A data de início não pode ser posterior à data de fim.");
    }
  }
}

module.exports = FeiraService;
