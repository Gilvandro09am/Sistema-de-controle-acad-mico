const express = require("express");
const AvaliacaoRepository = require("../repositories/AvaliacaoRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoRepository.obterTodos();
    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao obter avaliações:", error);
    res.status(500).json({ erro: "Erro ao obter avaliações" });
  }
});

router.post("/", async (req, res) => {
  try {
    const prova = Number(req.body.prova) || 0;
    const participacao = Number(req.body.participacao) || 0;
    const trabalho = Number(req.body.trabalho) || 0;
    const media = Number(((prova + participacao + trabalho) / 3).toFixed(2));

    const avaliacao = await AvaliacaoRepository.criar({
      turmaId: req.body.turmaId,
      turmaNome: req.body.turmaNome,
      professorId: req.body.professorId,
      professorNome: req.body.professorNome,
      alunoId: req.body.alunoId,
      alunoNome: req.body.alunoNome,
      prova,
      participacao,
      trabalho,
      media,
      data: new Date().toISOString(),
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ erro: "Erro ao criar avaliação" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await AvaliacaoRepository.deletar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    res.status(500).json({ erro: "Erro ao deletar avaliação" });
  }
});

module.exports = router;
