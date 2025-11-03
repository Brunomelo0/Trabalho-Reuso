const Joi = require("joi");

const itemVendaSchema = Joi.object({
  vendaId: Joi.number().integer().positive().required(),
  produtoId: Joi.number().integer().positive().required(),
  quantidade: Joi.number().integer().min(1).required(),
  precoUnitario: Joi.number().positive().required(),
});

module.exports = itemVendaSchema;