




const express = require("express");
const cors = require("cors");
const { initializeTables } = require("./database/init");

const alunosRoutes = require("./routes/alunosRoutes");
const professoresRoutes = require("./routes/professoresRoutes");
const turmasRoutes = require("./routes/turmasRoutes");
const avaliacoesRoutes = require("./routes/avaliacoesRoutes");
const frequenciasRoutes = require("./routes/frequenciasRoutes");

const app = express();

// Inicializar banco de dados
initializeTables().catch(error => {
	console.error("Erro ao inicializar banco de dados:", error);
});

app.use(cors());
app.use(express.json());

app.use("/alunos", alunosRoutes);
app.use("/professores", professoresRoutes);
app.use("/turmas", turmasRoutes);
app.use("/avaliacoes", avaliacoesRoutes);
app.use("/frequencias", frequenciasRoutes);

module.exports = app;