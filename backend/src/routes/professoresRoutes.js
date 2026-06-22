







const express = require("express");
const ProfessorRepository = require("../repositories/ProfessorRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const professores = await ProfessorRepository.obterTodos();
    res.json(professores);
  } catch (error) {
    console.error("Erro ao obter professores:", error);
    res.status(500).json({ erro: "Erro ao obter professores" });
  }
});

router.post("/", async (req, res) => {
  try {
    const professor = await ProfessorRepository.criar({
      nome: req.body.nome,
      email: req.body.email,
      disciplina: req.body.disciplina
    });

    res.status(201).json(professor);
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    res.status(500).json({ erro: "Erro ao criar professor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const professor = await ProfessorRepository.obterPorId(Number(req.params.id));
    if (!professor) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }
    res.json(professor);
  } catch (error) {
    console.error("Erro ao obter professor:", error);
    res.status(500).json({ erro: "Erro ao obter professor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const professor = await ProfessorRepository.atualizar(Number(req.params.id), {
      nome: req.body.nome,
      email: req.body.email,
      disciplina: req.body.disciplina
    });

    res.json(professor);
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ erro: "Erro ao atualizar professor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ProfessorRepository.deletar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    res.status(500).json({ erro: "Erro ao deletar professor" });
  }
});

module.exports = router;
