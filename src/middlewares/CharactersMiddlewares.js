const mongoose = require("mongoose");
const Character = require("../models/Character");

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ error: "Id inválido!" });
    return;
  }

  try {
    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).send({ msg: "Personagem não encontrado" });
    }
    res.character = character; // respondendo ao servidor com o personagem que foi validado
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }

  next();
};

module.exports = { validateId };