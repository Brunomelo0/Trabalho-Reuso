const ServiceFactory = require("../services/serviceFactory");
const estandeService = ServiceFactory.createService("Estande");

exports.createEstande = async (req, res, next) => {
  try {
    const created = await estandeService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllEstandes = async (req, res, next) => {
  try {
    const estandes = await estandeService.getAll();
    res.json(estandes);
  } catch (error) {
    next(error);
  }
};

exports.getEstandeById = async (req, res, next) => {
  try {
    const estande = await estandeService.getById(req.params.id);
    if (!estande) return res.status(404).json({ error: "Estande não encontrado" });
    res.json(estande);
  } catch (error) {
    next(error);
  }
};

exports.updateEstande = async (req, res, next) => {
  try {
    const updated = await estandeService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Estande não encontrado" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteEstande = async (req, res, next) => {
  try {
    const deleted = await estandeService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Estande não encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};