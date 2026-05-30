const express = require("express");

const alunoRoutes = require("./routes/alunoRoutes");

const app = express();

app.use(express.json());

app.use("/alunos", alunoRoutes);

module.exports = app;