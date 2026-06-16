const express = require("express");

const router = express.Router();

let avaliacoes = [];

router.get("/", (req, res) => {
  res.json(avaliacoes);
});

router.post("/", (req, res) => {
  const avaliacao = {
    id: Date.now(),
    alunoId: req.body.alunoId,
    alunoNome: req.body.alunoNome,
    disciplina: req.body.disciplina,
    nota: req.body.nota,
  };

  avaliacoes.push(avaliacao);

  res.status(201).json(avaliacao);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  avaliacoes = avaliacoes.filter((avaliacao) => avaliacao.id !== id);
  res.status(204).send();
});

module.exports = router;
