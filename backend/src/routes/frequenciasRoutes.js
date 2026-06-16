const express = require("express");

const router = express.Router();

let frequencias = [];

router.get("/", (req, res) => {
  res.json(frequencias);
});

router.post("/", (req, res) => {
  const frequencia = {
    id: Date.now(),
    alunoId: req.body.alunoId,
    alunoNome: req.body.alunoNome,
    turma: req.body.turma,
    totalAulas: req.body.totalAulas,
    presentes: req.body.presentes,
  };

  frequencias.push(frequencia);

  res.status(201).json(frequencia);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  frequencias = frequencias.filter((frequencia) => frequencia.id !== id);
  res.status(204).send();
});

module.exports = router;
