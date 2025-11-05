const express = require("express");
const router = express.Router();
const vendaController = require("../controllers/vendaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", vendaController.createVenda);

router.get("/", vendaController.getAllVendas);

router.get("/:id", vendaController.getVendaById);

module.exports = router;
