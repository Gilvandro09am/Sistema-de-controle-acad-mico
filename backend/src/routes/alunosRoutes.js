











const express = require("express");
const AlunoRepository = require("../repositories/AlunoRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const alunos = await AlunoRepository.obterTodos();
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao obter alunos:", error);
    res.status(500).json({ erro: "Erro ao obter alunos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const aluno = await AlunoRepository.criar({
      nome: req.body.nome,
      matricula: req.body.matricula,
      idade: req.body.idade,
      turmaId: req.body.turmaId
    });

    res.status(201).json(aluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ erro: "Erro ao criar aluno" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aluno = await AlunoRepository.obterPorId(Number(req.params.id));
    if (!aluno) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao obter aluno:", error);
    res.status(500).json({ erro: "Erro ao obter aluno" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const aluno = await AlunoRepository.atualizar(Number(req.params.id), {
      nome: req.body.nome,
      matricula: req.body.matricula,
      idade: req.body.idade,
      turmaId: req.body.turmaId
    });

    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ erro: "Erro ao atualizar aluno" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await AlunoRepository.deletar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ erro: "Erro ao deletar aluno" });
  }
});

module.exports = router;