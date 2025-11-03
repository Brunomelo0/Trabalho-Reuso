const ItemVenda = require("../models/itemVenda");
const itemVendaSchema = require("../validations/itemVendaValidation");

exports.getAllItensVenda = async (req, res) => {
  try {
    const itensVenda = await ItemVenda.findAll();
    res.json(itensVenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemVendaById = async (req, res) => {
  try {
    const itemVenda = await ItemVenda.findByPk(req.params.id);
    if (!itemVenda) return res.status(404).json({ message: "Item de Venda não encontrado" });
    res.json(itemVenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItemVenda = async (req, res, next) => {
  try {
    const { error } = itemVendaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newItemVenda = await ItemVenda.create(req.body);
    res.status(201).json(newItemVenda);
  } catch (error) {
    next(error);
  }
};

exports.updateItemVenda = async (req, res, next) => {
  try {
    const { error } = itemVendaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const itemVenda = await ItemVenda.findByPk(req.params.id);
    if (!itemVenda) return res.status(404).json({ error: "Item de Venda não encontrado" });

    await itemVenda.update(req.body);
    res.json(itemVenda);
  } catch (error) {
    next(error);
  }
};

exports.deleteItemVenda = async (req, res) => {
  try {
    const itemVenda = await ItemVenda.findByPk(req.params.id);
    if (!itemVenda) return res.status(404).json({ message: "Item de Venda não encontrado" });

    await itemVenda.destroy();
    res.json({ message: "Item de Venda deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};