const express = require("express");

const router = express.Router();

let frequencias = [];

router.get("/", (req, res) => {
  res.json(frequencias);
});

router.post("/", (req, res) => {
  const totalAulas = Number(req.body.totalAulas) || 0;
  const presentes = Number(req.body.presentes) || 0;
  const faltas = Math.max(0, totalAulas - presentes);
  const percentual = totalAulas > 0 ? Math.round((presentes / totalAulas) * 100) : 0;

  const frequencia = {
    id: Date.now(),
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
