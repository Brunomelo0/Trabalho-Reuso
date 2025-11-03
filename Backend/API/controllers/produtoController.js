const Produto = require("../models/produto");
const produtoSchema = require("../validations/produtoValidation");

exports.getTotalProdutos = async (req, res) => {
  try {
      const total = await Produto.count();
      res.json({ total: Number(total) });
  } catch (error) {
      res.status(500).json({ error: "Erro ao obter total de produtos" });
  }
};

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduto = async (req, res, next) => {
  try {
    const { error } = produtoSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newProduto = await Produto.create(req.body);
    res.status(201).json(newProduto);
  } catch (error) {
    next(error);
  }
};

exports.updateProduto = async (req, res, next) => {
  try {
    const { error } = produtoSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    await produto.update(req.body);
    res.json(produto);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

    await produto.destroy();
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};