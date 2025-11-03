// Controller da entidade Venda (refatorado)
// Usa o padrão Facade para operações compostas (venda + itens + estoque)

const AppFacade = require("../services/appFacade");

exports.createVenda = async (req, res, next) => {
  try {
    const { venda, itens } = req.body;
    const created = await AppFacade.createVendaWithItems(venda, itens);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllVendas = async (req, res, next) => {
  try {
    const vendas = await AppFacade.getAllVendas();
    res.json(vendas);
  } catch (error) {
    next(error);
  }
};

exports.getVendaById = async (req, res, next) => {
  try {
    const venda = await AppFacade.getVendaById(req.params.id);
    if (!venda) return res.status(404).json({ error: "Venda não encontrada" });
    res.json(venda);
  } catch (error) {
    next(error);
  }
};