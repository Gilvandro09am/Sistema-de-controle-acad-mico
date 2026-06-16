import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { listarProfessores } from "../services/professorService";
import {
    cadastrarTurma,
    excluirTurma,
    listarTurmas
} from "../services/turmaService";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState("");
  const [anoLetivo, setAnoLetivo] = useState("");
  const [professorSelecionados, setProfessorSelecionados] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const turmasData = await listarTurmas();
      const professoresData = await listarProfessores();
      setTurmas(turmasData);
      setProfessores(professoresData);
    }

    carregarDados();
  }, []);

  async function salvarTurma() {
    if (!nome || !anoLetivo) {
      alert("Preencha o nome da turma e o ano letivo");
      return;
    }

    const selecionados = professores.filter((professor) =>
      professorSelecionados.includes(String(professor.id))
    );

    await cadastrarTurma({
      nome,
      anoLetivo,
      professores: selecionados
    });

    setNome("");
    setAnoLetivo("");
    setProfessorSelecionados([]);

    const turmasData = await listarTurmas();
    setTurmas(turmasData);
  }

  async function removerTurma(id) {
    await excluirTurma(id);
    const turmasData = await listarTurmas();
    setTurmas(turmasData);
  }

  function toggleProfessor(id) {
    setProfessorSelecionados((current) => {
      const stringId = String(id);
      if (current.includes(stringId)) {
        return current.filter((item) => item !== stringId);
      }
      return [...current, stringId];
    });
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />

        <h1 className="mb-4">Gerenciamento de Turmas</h1>

        <div className="card p-4 mb-4">
          <h4>Nova Turma</h4>
          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Nome da Turma"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Ano Letivo"
                value={anoLetivo}
                onChange={(e) => setAnoLetivo(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <div className="form-control h-auto">
                <label className="form-label">Professores</label>
                {professores.map((professor) => (
                  <div className="form-check" key={professor.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`professor-${professor.id}`}
                      checked={professorSelecionados.includes(String(professor.id))}
                      onChange={() => toggleProfessor(professor.id)}
                    />
                    <label className="form-check-label" htmlFor={`professor-${professor.id}`}>
                      {professor.nome} ({professor.disciplina})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-2 mt-3">
              <button className="btn btn-success w-100" onClick={salvarTurma}>
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h4>Lista de Turmas</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ano Letivo</th>
                <th>Professores</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nome}</td>
                  <td>{turma.anoLetivo}</td>
                  <td>{(turma.professores || []).map((prof) => prof.nome).join(", ") || "-"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removerTurma(turma.id)}
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

export default Turmas;