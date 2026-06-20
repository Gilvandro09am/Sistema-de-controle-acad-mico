import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { listarAlunos } from "../services/alunoService";
import { listarProfessores } from "../services/professorService";
import {
    atualizarTurma,
    cadastrarTurma,
    excluirTurma,
    listarTurmas
} from "../services/turmaService";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [anoLetivo, setAnoLetivo] = useState("");
  const [professorSelecionados, setProfessorSelecionados] = useState([]);
  const [alunoSelecionados, setAlunoSelecionados] = useState([]);
  const [editandoTurma, setEditandoTurma] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      const turmasData = await listarTurmas();
      const professoresData = await listarProfessores();
      const alunosData = await listarAlunos();
      setTurmas(turmasData);
      setProfessores(professoresData);
      setAlunos(alunosData);
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

    const selecionadosAlunos = alunos.filter((aluno) =>
      alunoSelecionados.includes(String(aluno.id))
    );

    await cadastrarTurma({
      nome,
      anoLetivo,
      professores: selecionados,
      alunos: selecionadosAlunos,
    });

    setNome("");
    setAnoLetivo("");
    setProfessorSelecionados([]);
    setAlunoSelecionados([]);

    const turmasData = await listarTurmas();
    setTurmas(turmasData);
  }

  async function removerTurma(id) {
    await excluirTurma(id);
    const turmasData = await listarTurmas();
    setTurmas(turmasData);
  }

  async function salvarTurmaEdicao() {
    if (!editandoTurma) return;

    const selecionados = professores.filter((professor) =>
      editandoTurma.professorSelecionados.includes(String(professor.id))
    );
    const selecionadosAlunos = alunos.filter((aluno) =>
      editandoTurma.alunoSelecionados.includes(String(aluno.id))
    );

    const turmaAtualizada = {
      nome: editandoTurma.nome,
      anoLetivo: editandoTurma.anoLetivo,
      professores: selecionados,
      alunos: selecionadosAlunos,
    };

    await atualizarTurma(editandoTurma.id, turmaAtualizada);

    const turmasData = await listarTurmas();
    setTurmas(turmasData);
    setEditandoTurma(null);
  }

  function editarTurma(turma) {
    setEditandoTurma({
      ...turma,
      professorSelecionados: (turma.professores || []).map((prof) => String(prof.id)),
      alunoSelecionados: (turma.alunos || []).map((aluno) => String(aluno.id)),
    });
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

  function toggleAluno(id) {
    setAlunoSelecionados((current) => {
      const stringId = String(id);
      if (current.includes(stringId)) {
        return current.filter((item) => item !== stringId);
      }
      return [...current, stringId];
    });
  }

  function toggleProfessorEdit(id) {
    setEditandoTurma((current) => {
      if (!current) return current;
      const stringId = String(id);
      const selected = current.professorSelecionados || [];
      const next = selected.includes(stringId)
        ? selected.filter((item) => item !== stringId)
        : [...selected, stringId];
      return { ...current, professorSelecionados: next };
    });
  }

  function toggleAlunoEdit(id) {
    setEditandoTurma((current) => {
      if (!current) return current;
      const stringId = String(id);
      const selected = current.alunoSelecionados || [];
      const next = selected.includes(stringId)
        ? selected.filter((item) => item !== stringId)
        : [...selected, stringId];
      return { ...current, alunoSelecionados: next };
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

                <hr />

                <label className="form-label mt-2">Alunos</label>
                {alunos.map((aluno) => (
                  <div className="form-check" key={aluno.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`aluno-${aluno.id}`}
                      checked={alunoSelecionados.includes(String(aluno.id))}
                      onChange={() => toggleAluno(aluno.id)}
                    />
                    <label className="form-check-label" htmlFor={`aluno-${aluno.id}`}>
                      {aluno.nome} ({aluno.matricula || aluno.id})
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

        {editandoTurma && (
          <div className="card p-4 mb-4 border-primary">
            <h4>Editar Turma: {editandoTurma.nome}</h4>
            <div className="row">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Nome da Turma"
                  value={editandoTurma.nome}
                  onChange={(e) => setEditandoTurma({ ...editandoTurma, nome: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Ano Letivo"
                  value={editandoTurma.anoLetivo}
                  onChange={(e) => setEditandoTurma({ ...editandoTurma, anoLetivo: e.target.value })}
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
                        id={`edit-professor-${professor.id}`}
                        checked={editandoTurma.professorSelecionados?.includes(String(professor.id))}
                        onChange={() => toggleProfessorEdit(professor.id)}
                      />
                      <label className="form-check-label" htmlFor={`edit-professor-${professor.id}`}>
                        {professor.nome} ({professor.disciplina})
                      </label>
                    </div>
                  ))}

                  <hr />

                  <label className="form-label mt-2">Alunos</label>
                  {alunos.map((aluno) => (
                    <div className="form-check" key={aluno.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`edit-aluno-${aluno.id}`}
                        checked={editandoTurma.alunoSelecionados?.includes(String(aluno.id))}
                        onChange={() => toggleAlunoEdit(aluno.id)}
                      />
                      <label className="form-check-label" htmlFor={`edit-aluno-${aluno.id}`}>
                        {aluno.nome} ({aluno.matricula || aluno.id})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={salvarTurmaEdicao}>
                  Salvar alterações
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-secondary w-100" onClick={() => setEditandoTurma(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card p-4">
          <h4>Lista de Turmas</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ano Letivo</th>
                <th>Professores</th>
                <th>Alunos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nome}</td>
                  <td>{turma.anoLetivo}</td>
                  <td>{(turma.professores || []).map((prof) => prof.nome).join(", ") || "-"}</td>
                  <td>{(turma.alunos || []).map((a) => a.nome).join(", ") || "-"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editarTurma(turma)}
                    >
                      Editar
                    </button>
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