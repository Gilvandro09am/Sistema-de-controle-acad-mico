const express = require("express");

const router = express.Router();

let professores = [];

router.get("/", (req, res) => {
  res.json(professores);
});

router.post("/", (req, res) => {
  const professor = {
    id: Date.now(),
    nome: req.body.nome,
    disciplina: req.body.disciplina,
    email: req.body.email,
  };

  professores.push(professor);

  res.status(201).json(professor);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  professores = professores.filter((professor) => professor.id !== id);
  res.status(204).send();
});

module.exports = router;
