const express = require("express");
const router = express.Router();
const itemVendaController = require("../controllers/itemVendaController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateId = require("../middlewares/validateId");

router.get("/",authMiddleware, itemVendaController.getAllItensVenda);
router.get("/:id",authMiddleware, validateId, itemVendaController.getItemVendaById);
router.post("/",authMiddleware, itemVendaController.createItemVenda);
router.put("/:id",authMiddleware, validateId, itemVendaController.updateItemVenda);
router.delete("/:id",authMiddleware, validateId, itemVendaController.deleteItemVenda);

module.exports = router;