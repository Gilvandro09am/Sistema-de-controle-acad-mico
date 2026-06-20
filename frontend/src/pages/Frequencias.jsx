import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { listarAlunos } from "../services/alunoService";
import { cadastrarFrequencia, excluirFrequencia, listarFrequencias } from "../services/frequenciaService";
import { listarProfessores } from "../services/professorService";
import { listarTurmas } from "../services/turmaService";

function Frequencias() {
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);

  const [professorId, setProfessorId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [totalAulas, setTotalAulas] = useState("");
  const [presentes, setPresentes] = useState("");

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
      const [professoresData, turmasData, alunosData, frequenciasData] = await Promise.all([
        listarProfessores(),
        listarTurmas(),
        listarAlunos(),
        listarFrequencias(),
      ]);

      setProfessores(professoresData);
      setTurmas(turmasData);
      setAlunos(alunosData);
      setFrequencias(frequenciasData);
    }

    carregarDados();
  }, []);

  async function salvarFrequencia() {
    const professor = professores.find((item) => String(item.id) === String(professorId));
    const turma = turmas.find((item) => String(item.id) === String(turmaId));
    const aluno = alunos.find((item) => String(item.id) === String(alunoId));

    if (!professor || !turma || !aluno) {
      alert("Selecione professor, turma e aluno antes de salvar.");
      return;
    }

    const totalAulasValue = Number(totalAulas) || 0;
    const presentesValue = Number(presentes) || 0;
    const faltasValue = Math.max(0, totalAulasValue - presentesValue);
    const percentualValue = totalAulasValue > 0 ? Number(((presentesValue / totalAulasValue) * 100).toFixed(2)) : 0;

    await cadastrarFrequencia({
      professorId: professor.id,
      professorNome: professor.nome,
      turmaId: turma.id,
      turmaNome: turma.nome,
      alunoId: aluno.id,
      alunoNome: aluno.nome,
      totalAulas: totalAulasValue,
      presentes: presentesValue,
      faltas: faltasValue,
      percentual: percentualValue,
    });

    setTotalAulas("");
    setPresentes("");
    setAlunoId("");

    const frequenciasData = await listarFrequencias();
    setFrequencias(frequenciasData);
  }

  async function removerFrequencia(id) {
    await excluirFrequencia(id);
    const frequenciasData = await listarFrequencias();
    setFrequencias(frequenciasData);
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />

        <h1 className="mb-4">Frequências</h1>

        <div className="card p-4 mb-4">
          <h4>Nova Frequência</h4>
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
            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Total de aulas" value={totalAulas} onChange={(e) => setTotalAulas(e.target.value)} />
            </div>
            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Presentes" value={presentes} onChange={(e) => setPresentes(e.target.value)} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={salvarFrequencia}>
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h4>Histórico de Frequências</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Turma</th>
                <th>Professor</th>
                <th>Aluno</th>
                <th>Total Aulas</th>
                <th>Presentes</th>
                <th>Faltas</th>
                <th>%</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {frequencias.map((item) => (
                <tr key={item.id}>
                  <td>{item.turmaNome}</td>
                  <td>{item.professorNome}</td>
                  <td>{item.alunoNome}</td>
                  <td>{item.totalAulas}</td>
                  <td>{item.presentes}</td>
                  <td>{item.faltas}</td>
                  <td>{item.percentual}%</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removerFrequencia(item.id)}>
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

export default Frequencias;