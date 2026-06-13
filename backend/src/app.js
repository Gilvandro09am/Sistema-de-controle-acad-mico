const express = require("express");
const cors = require("cors");

const alunosRoutes = require("./routes/alunosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alunos", alunosRoutes);

module.exports = app;