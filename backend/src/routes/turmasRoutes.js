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
      nome: req.body.nome,
      nomeTurma: req.body.nomeTurma,
      anoLetivo: req.body.anoLetivo,
      professores: req.body.professores || [],
      alunos: req.body.alunos || [],
    });

    res.status(201).json(turma);
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res.status(500).json({ erro: "Erro ao criar turma" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const turma = await TurmaRepository.atualizar(Number(req.params.id), {
      nome: req.body.nome,
      nomeTurma: req.body.nomeTurma,
      anoLetivo: req.body.anoLetivo,
      professores: req.body.professores || [],
      alunos: req.body.alunos || [],
    });

    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }

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

module.exports = router;
