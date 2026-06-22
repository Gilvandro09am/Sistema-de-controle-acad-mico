const express = require("express");
const TurmaRepository = require("../repositories/TurmaRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const turmas = await TurmaRepository.obterTodos();
    res.json(turmas);
  } catch (error) {
    console.error("Erro ao obter turmas:", error);
    res.status(500).json({ erro: "Erro ao obter turmas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const turma = await TurmaRepository.criar({
      nomeTurma: req.body.nomeTurma || req.body.nome,
      anoLetivo: req.body.anoLetivo
    });

    res.status(201).json(turma);
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res.status(500).json({ erro: "Erro ao criar turma" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const turma = await TurmaRepository.obterPorId(Number(req.params.id));
    if (!turma) {
      return res.status(404).json({ erro: "Turma não encontrada" });
    }
    res.json(turma);
  } catch (error) {
    console.error("Erro ao obter turma:", error);
    res.status(500).json({ erro: "Erro ao obter turma" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const turma = await TurmaRepository.atualizar(Number(req.params.id), {
      nomeTurma: req.body.nomeTurma || req.body.nome,
      anoLetivo: req.body.anoLetivo
    });

    res.json(turma);
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res.status(500).json({ erro: "Erro ao atualizar turma" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await TurmaRepository.deletar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar turma:", error);
    res.status(500).json({ erro: "Erro ao deletar turma" });
  }
});

router.get("/:id/alunos", async (req, res) => {
  try {
    const turma = await TurmaRepository.obterComAlunos(Number(req.params.id));
    if (!turma) {
      return res.status(404).json({ erro: "Turma não encontrada" });
    }
    res.json(turma);
  } catch (error) {
    console.error("Erro ao obter turma com alunos:", error);
    res.status(500).json({ erro: "Erro ao obter turma com alunos" });
  }
});

module.exports = router;
