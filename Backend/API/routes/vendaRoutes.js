const express = require("express");
const router = express.Router();
const vendaController = require("../controllers/vendaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Criar venda com itens
router.post("/", vendaController.createVenda);

// Listar todas as vendas
router.get("/", vendaController.getAllVendas);

// Buscar uma venda por ID
router.get("/:id", vendaController.getVendaById);

module.exports = router;
