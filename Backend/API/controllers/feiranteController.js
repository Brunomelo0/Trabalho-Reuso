// Controller da entidade Feirante (refatorado)

const ServiceFactory = require("../services/serviceFactory");
const feiranteService = ServiceFactory.createService("Feirante");

exports.createFeirante = async (req, res, next) => {
  try {
    const created = await feiranteService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getAllFeirantes = async (req, res, next) => {
  try {
    const feirantes = await feiranteService.getAll();
    res.json(feirantes);
  } catch (error) {
    next(error);
  }
};

exports.getFeiranteById = async (req, res, next) => {
  try {
    const feirante = await feiranteService.getById(req.params.id);
    if (!feirante) return res.status(404).json({ error: "Feirante não encontrado" });
    res.json(feirante);
  } catch (error) {
    next(error);
  }
};

exports.updateFeirante = async (req, res, next) => {
  try {
    const updated = await feiranteService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Feirante não encontrado" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteFeirante = async (req, res, next) => {
  try {
    const deleted = await feiranteService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Feirante não encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};