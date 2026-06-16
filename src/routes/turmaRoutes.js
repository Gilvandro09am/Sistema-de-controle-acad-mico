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
        professores: Array.isArray(req.body.professores) ? req.body.professores : []
    };

    turmas.push(turma);

    res.status(201).json(turma);
});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const turma = turmas.find(
        t => t.id === id
    );

    if (!turma) {
        return res.status(404).json({
            mensagem: "Turma não encontrada"
        });
    }

    turma.nome = req.body.nome;
    turma.anoLetivo = req.body.anoLetivo;
    turma.professores = Array.isArray(req.body.professores) ? req.body.professores : [];

    res.json(turma);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    turmas = turmas.filter(
        t => t.id !== id
    );

    res.status(204).send();
});

module.exports = router;