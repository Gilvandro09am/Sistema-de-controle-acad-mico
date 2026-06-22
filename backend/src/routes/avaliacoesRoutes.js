const express = require("express");

const router = express.Router();

let avaliacoes = [];

router.get("/", (req, res) => {
  res.json(avaliacoes);
});

router.post("/", (req, res) => {
  const prova = Number(req.body.prova) || 0;
  const participacao = Number(req.body.participacao) || 0;
  const trabalho = Number(req.body.trabalho) || 0;
  const media = Number(((prova + participacao + trabalho) / 3).toFixed(2));

  const avaliacao = {
    id: Date.now(),
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
