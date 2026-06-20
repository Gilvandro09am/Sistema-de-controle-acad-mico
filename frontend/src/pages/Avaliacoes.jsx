import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { listarAlunos } from "../services/alunoService";
import { cadastrarAvaliacao, excluirAvaliacao, listarAvaliacoes } from "../services/avaliacaoService";
import { listarProfessores } from "../services/professorService";
import { listarTurmas } from "../services/turmaService";

function Avaliacoes() {
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [professorId, setProfessorId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [prova, setProva] = useState("");
  const [participacao, setParticipacao] = useState("");
  const [trabalho, setTrabalho] = useState("");

  const turmasFiltradas = professorId
    ? turmas.filter((turma) =>
        (turma.professores || []).some((prof) => String(prof.id) === String(professorId))
      )
    : turmas;

  const alunosFiltrados = turmaId
    ? alunos.filter((aluno) => String(aluno.turmaId) === String(turmaId))
    : [];

  useEffect(() => {
    async function carregarDados() {
      const [professoresData, turmasData, alunosData, avaliacoesData] = await Promise.all([
        listarProfessores(),
        listarTurmas(),
        listarAlunos(),
        listarAvaliacoes(),
      ]);

      setProfessores(professoresData);
      setTurmas(turmasData);
      setAlunos(alunosData);
      setAvaliacoes(avaliacoesData);
    }

    carregarDados();
  }, []);

  async function salvarAvaliacao() {
    const professor = professores.find((item) => String(item.id) === String(professorId));
    const turma = turmas.find((item) => String(item.id) === String(turmaId));
    const aluno = alunos.find((item) => String(item.id) === String(alunoId));

    if (!professor || !turma || !aluno) {
      alert("Selecione professor, turma e aluno antes de salvar.");
      return;
    }

    const provaValue = Number(prova) || 0;
    const participacaoValue = Number(participacao) || 0;
    const trabalhoValue = Number(trabalho) || 0;
    const media = Number(((provaValue + participacaoValue + trabalhoValue) / 3).toFixed(2));

    await cadastrarAvaliacao({
      professorId: professor.id,
      professorNome: professor.nome,
      turmaId: turma.id,
      turmaNome: turma.nome,
      alunoId: aluno.id,
      alunoNome: aluno.nome,
      prova: provaValue,
      participacao: participacaoValue,
      trabalho: trabalhoValue,
      media,
    });

    setProva("");
    setParticipacao("");
    setTrabalho("");
    setAlunoId("");

    const avaliacoesData = await listarAvaliacoes();
    setAvaliacoes(avaliacoesData);
  }

  async function removerAvaliacao(id) {
    await excluirAvaliacao(id);
    const avaliacoesData = await listarAvaliacoes();
    setAvaliacoes(avaliacoesData);
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />

        <h1 className="mb-4">Avaliações</h1>

        <div className="card p-4 mb-4">
          <h4>Nova Avaliação</h4>
          <div className="row gy-3">
            <div className="col-md-4">
              <select className="form-select" value={professorId} onChange={(e) => {
                setProfessorId(e.target.value);
                setTurmaId("");
                setAlunoId("");
              }}>
                <option value="">Selecione o Professor</option>
                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome} ({professor.disciplina})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={turmaId} onChange={(e) => {
                setTurmaId(e.target.value);
                setAlunoId("");
              }}>
                <option value="">Selecione a Turma</option>
                {turmasFiltradas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome} ({turma.anoLetivo})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
                <option value="">Selecione o Aluno</option>
                {alunosFiltrados.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome} ({aluno.matricula})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" placeholder="Prova" value={prova} onChange={(e) => setProva(e.target.value)} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" placeholder="Participação" value={participacao} onChange={(e) => setParticipacao(e.target.value)} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" placeholder="Trabalho" value={trabalho} onChange={(e) => setTrabalho(e.target.value)} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={salvarAvaliacao}>
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h4>Histórico de Avaliações</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Turma</th>
                <th>Professor</th>
                <th>Aluno</th>
                <th>Prova</th>
                <th>Participação</th>
                <th>Trabalho</th>
                <th>Média</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {avaliacoes.map((item) => (
                <tr key={item.id}>
                  <td>{item.turmaNome}</td>
                  <td>{item.professorNome}</td>
                  <td>{item.alunoNome}</td>
                  <td>{item.prova}</td>
                  <td>{item.participacao}</td>
                  <td>{item.trabalho}</td>
                  <td>{item.media?.toFixed ? item.media.toFixed(2) : item.media}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removerAvaliacao(item.id)}>
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

export default Avaliacoes; 