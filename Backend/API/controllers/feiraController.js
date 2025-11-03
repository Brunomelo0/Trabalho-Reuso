// Controller da entidade Feira (refatorado)
// Agora utiliza o padrão Factory + Template Method (BaseService)

const ServiceFactory = require("../services/serviceFactory");
const feiraService = ServiceFactory.createService("Feira");

exports.createFeira = async (req, res, next) => {
  try {
    const created = await feiraService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllFeiras = async (req, res, next) => {
  try {
    const feiras = await feiraService.getAll();
    res.json(feiras);
  } catch (error) {
    next(error);
  }
};

exports.getFeiraById = async (req, res, next) => {
  try {
    const feira = await feiraService.getById(req.params.id);
    if (!feira) return res.status(404).json({ error: "Feira não encontrada" });
    res.json(feira);
  } catch (error) {
    next(error);
  }
};

exports.updateFeira = async (req, res, next) => {
  try {
    const updated = await feiraService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Feira não encontrada" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteFeira = async (req, res, next) => {
  try {
    const deleted = await feiraService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Feira não encontrada" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
