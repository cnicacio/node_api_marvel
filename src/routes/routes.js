const express = require("express");
const router = express.Router();

const CharacterController = require("../controllers/CharactersController");
const CharacterMiddleware = require("../middlewares/CharactersMiddlewares");

router.get("/characters", CharacterController.getAll);
router.get("/characters/:id", CharacterMiddleware.validateId, CharacterController.getById);
router.post("/characters", CharacterController.create);
router.put("/characters/:id", CharacterMiddleware.validateId, CharacterController.update);
router.delete("/characters/:id", CharacterMiddleware.validateId, CharacterController.del);
router.get("/filterByName", CharacterController.filterByName);
router.get("filterAll", CharacterController.filterAll);

module.exports = router;