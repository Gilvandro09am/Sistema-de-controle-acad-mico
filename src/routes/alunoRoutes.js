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

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    aluno.nome = req.body.nome;

    res.json(aluno);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    alunos = alunos.filter(a => a.id !== id);

    res.status(204).send();
});

module.exports = router;