const express = require("express");

const router = express.Router();

let turmas = [];

router.get("/", (req, res) => {
  res.json(turmas);
});

router.post("/", (req, res) => {
  const turma = {
    id: Date.now(),
    nome: req.body.nome,
    anoLetivo: req.body.anoLetivo,
  };

  turmas.push(turma);

  res.status(201).json(turma);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  turmas = turmas.filter((turma) => turma.id !== id);
  res.status(204).send();
});

module.exports = router;
