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
    professores: req.body.professores || [],
    alunos: req.body.alunos || [],
  };

  turmas.push(turma);

  res.status(201).json(turma);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const turma = turmas.find((turma) => turma.id === id);

  if (!turma) {
    return res.status(404).json({ mensagem: "Turma não encontrada" });
  }

  turma.nome = req.body.nome ?? turma.nome;
  turma.anoLetivo = req.body.anoLetivo ?? turma.anoLetivo;
  if (Array.isArray(req.body.professores)) {
    turma.professores = req.body.professores;
  }
  if (Array.isArray(req.body.alunos)) {
    turma.alunos = req.body.alunos;
  }

  res.json(turma);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  turmas = turmas.filter((turma) => turma.id !== id);
  res.status(204).send();
});

module.exports = router;
