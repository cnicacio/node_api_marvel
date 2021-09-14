const Character = require("../models/Character");

const getAll = async (req, res) => {
  try {
    const characters = await Character.find(); // promise
    return res.send({ characters });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const character = await Character.findById(id);
    if (!character) {
      res.status(404).json({ message: "Personagem não encontrado" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const create = async (req, res) => {
  const { name, identity, gender, image } = req.body;

  if (!name || !identity || !gender || !image) {
    res
      .status(400)
      .send({ message: "Você não enviou todos os dados corretamente" });
    return;
  }

  const newCharacter = await new Character({
    name,
    identity,
    gender,
    image,
  });

  try {
    await newCharacter.save();
    return res
      .status(201)
      .send({ message: "Personagem criado com sucesso", newCharacter });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const update = async (req, res) => {
  const { name, identity, gender, image } = req.body;

  if (!name || !identity || !gender || !image) {
    res.status(400).send({
      message: "Você não enviou todos os dados necessários para o cadastro",
    });
    return;
  }

  res.character.name = name;
  res.character.identity = identity;
  res.character.gender = gender;
  res.character.image = image;

  try {
    await res.character.save();
    res.send({ message: "Personagem alterado com sucesso" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};  

const del = async (req, res) => {
  try {
    await res.character.remove();
    return res.send({ message: "Personagem removido com sucesso" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const filterByName = async (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send({ error: "Nome não encontrado!" });
    return;
  }

  try {
    const characters = await Character.find({ name: { $regex: `${nome}` } });
    return res.send({ characters });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const filterAll = async (req, res) => {
  const { name, identity, gender } = req.query;

  try {
    const characters = await Character.find({
      name: { $regex: `${name}` },
      identity: { $regex: `${identity}` },
      gender: { $regex: `${gender}` },
    });

    if (characters.length === 0) {
      return res.status(404).send({ error: "Personagem não encontrado" });
    }
    return res.send({ characters });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  filterByName,
  filterAll,
};
