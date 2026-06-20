const express = require("express");
const cors = require("cors");

const alunosRoutes = require("./routes/alunosRoutes");
const professoresRoutes = require("./routes/professoresRoutes");
const turmasRoutes = require("./routes/turmasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alunos", alunosRoutes);
app.use("/professores", professoresRoutes);
app.use("/turmas", turmasRoutes);

module.exports = app;