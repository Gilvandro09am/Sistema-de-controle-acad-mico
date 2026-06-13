const express = require("express");

const router = express.Router();

let alunos = [];

router.get("/", (req, res) => {
  res.json(alunos);
});

router.post("/", (req, res) => {

  const aluno = {
    id: Date.now(),
    nome: req.body.nome,
    matricula: req.body.matricula,
    idade: req.body.idade
  };

  alunos.push(aluno);

  res.status(201).json(aluno);
});

module.exports = router;