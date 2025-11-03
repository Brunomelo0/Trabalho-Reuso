const express = require("express");
const router = express.Router();
const estandeController = require("../controllers/estandeController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", estandeController.createEstande);
router.get("/", estandeController.getAllEstandes);
router.get("/:id", estandeController.getEstandeById);
router.put("/:id", estandeController.updateEstande);
router.delete("/:id", estandeController.deleteEstande);

module.exports = router;