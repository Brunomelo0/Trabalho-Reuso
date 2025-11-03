const Joi = require("joi");

const vendaSchema = Joi.object({
  clienteId: Joi.number().integer().positive().required(),
  data: Joi.date().iso().required(),
  total: Joi.number().positive().required(),
  status: Joi.string().valid("pendente", "pago", "cancelado").required(),
});

module.exports = vendaSchema;