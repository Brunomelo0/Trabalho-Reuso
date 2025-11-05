const express = require("express");
const router = express.Router();
const ServiceFactory = require("../services/serviceFactory");
const authMiddleware = require("../middlewares/authMiddleware");

const produtoService = ServiceFactory.createService("Produto");

router.use(authMiddleware);

router.post("/", async (req, res, next) => {
  try {
    const created = await produtoService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const produtos = await produtoService.getAll();
    res.json(produtos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const produto = await produtoService.getById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await produtoService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await produtoService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Produto não encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
