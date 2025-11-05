const express = require("express");
const router = express.Router();
const feiraController = require("../controllers/feiraController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", feiraController.createFeira);
router.get("/", feiraController.getAllFeiras);
router.get("/:id", feiraController.getFeiraById);
router.put("/:id", feiraController.updateFeira);
router.delete("/:id", feiraController.deleteFeira);

module.exports = router;
