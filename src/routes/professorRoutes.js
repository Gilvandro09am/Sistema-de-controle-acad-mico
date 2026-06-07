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
        email: req.body.email
    };

    professores.push(professor);

    res.status(201).json(professor);
});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const professor = professores.find(
        p => p.id === id
    );

    if (!professor) {
        return res.status(404).json({
            mensagem: "Professor não encontrado"
        });
    }

    professor.nome = req.body.nome;
    professor.disciplina = req.body.disciplina;
    professor.email = req.body.email;

    res.json(professor);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    professores = professores.filter(
        p => p.id !== id
    );

    res.status(204).send();
});

module.exports = router;