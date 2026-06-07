const express = require("express");

const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const turmaRoutes = require("./routes/turmaRoutes");

const app = express();

app.use(express.json());

app.use("/alunos", alunoRoutes);
app.use("/professores", professorRoutes);
app.use("/turmas", turmaRoutes);

module.exports = app;