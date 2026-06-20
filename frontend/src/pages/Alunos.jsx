import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import {
    cadastrarAluno,
    excluirAluno,
    listarAlunos
} from "../services/alunoService";
import { listarTurmas } from "../services/turmaService";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [idade, setIdade] = useState("");
  const [turmaId, setTurmaId] = useState("");

  async function carregarAlunos() {
    const dados = await listarAlunos();
    setAlunos(dados);
  }

  async function carregarTurmas() {
    const dados = await listarTurmas();
    setTurmas(dados);
  }

  function getNomeTurma(aluno) {
    return (
      aluno.turmaNome ||
      turmas.find((turma) => String(turma.id) === String(aluno.turmaId))?.nome ||
      "-"
    );
  }

  useEffect(() => {
    async function buscarDados() {
      await carregarAlunos();
      await carregarTurmas();
    }

    buscarDados();
  }, []);

  async function salvarAluno() {
    if (!nome || !matricula || !idade || !turmaId) {
      alert("Preencha todos os campos e selecione uma turma");
      return;
    }

    const turma = turmas.find((item) => String(item.id) === String(turmaId));

    await cadastrarAluno({
      nome,
      matricula,
      idade,
      turmaId: turma ? turma.id : null,
      turmaNome: turma ? turma.nome : ""
    });

    setNome("");
    setMatricula("");
    setIdade("");
    setTurmaId("");

    carregarAlunos();
  }

  async function removerAluno(id) {
    await excluirAluno(id);
    carregarAlunos();
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />

        <h1 className="mb-4">Gerenciamento de Alunos</h1>

        <div className="card p-4 mb-4">
          <h4>Novo Aluno</h4>
          <div className="row">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={turmaId}
                onChange={(e) => setTurmaId(e.target.value)}
              >
                <option value="">Selecione uma turma</option>
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome} ({turma.anoLetivo})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-1">
              <button
                className="btn btn-success w-100"
                onClick={salvarAluno}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h4>Lista de Alunos</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Idade</th>
                <th>Turma</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.idade}</td>
                  <td>{getNomeTurma(aluno)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removerAluno(aluno.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Alunos;