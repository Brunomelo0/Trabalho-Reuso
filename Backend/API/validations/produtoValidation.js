const Joi = require("joi");

const produtoSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  preco: Joi.number().positive().required(),
  estoque: Joi.number().integer().min(0).required(),
});

module.exports = produtoSchema;