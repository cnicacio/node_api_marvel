require("dotenv").config();
const express = require("express");
const connectToDb = require("./src/database/database");
const router = require("./src/routes/routes");

connectToDb(); // executa a função de conexão com o banbco de dados no server

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
