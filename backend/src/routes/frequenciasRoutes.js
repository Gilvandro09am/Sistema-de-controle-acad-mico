const express = require("express");
const FrequenciaRepository = require("../repositories/FrequenciaRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const frequencias = await FrequenciaRepository.obterTodos();
    res.json(frequencias);
  } catch (error) {
    console.error("Erro ao obter frequências:", error);
    res.status(500).json({ erro: "Erro ao obter frequências" });
  }
});

router.post("/", async (req, res) => {
  try {
    const totalAulas = Number(req.body.totalAulas) || 0;
    const presentes = Number(req.body.presentes) || 0;
    const faltas = Math.max(0, totalAulas - presentes);
    const percentual = totalAulas > 0 ? Math.round((presentes / totalAulas) * 100) : 0;

    const frequencia = await FrequenciaRepository.criar({
      turmaId: req.body.turmaId,
      turmaNome: req.body.turmaNome,
      professorId: req.body.professorId,
      professorNome: req.body.professorNome,
      alunoId: req.body.alunoId,
      alunoNome: req.body.alunoNome,
      totalAulas,
      presentes,
      faltas,
      percentual,
      data: new Date().toISOString(),
    });

    res.status(201).json(frequencia);
  } catch (error) {
    console.error("Erro ao criar frequência:", error);
    res.status(500).json({ erro: "Erro ao criar frequência" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await FrequenciaRepository.deletar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar frequência:", error);
    res.status(500).json({ erro: "Erro ao deletar frequência" });
  }
});

module.exports = router;
