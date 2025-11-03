const express = require("express");
const router = express.Router();
const feiranteController = require("../controllers/feiranteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", feiranteController.createFeirante);
router.get("/", feiranteController.getAllFeirantes);
router.get("/:id", feiranteController.getFeiranteById);
router.put("/:id", feiranteController.updateFeirante);
router.delete("/:id", feiranteController.deleteFeirante);

module.exports = router;
