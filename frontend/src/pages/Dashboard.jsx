import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { listarAlunos } from "../services/alunoService";
import { listarAvaliacoes } from "../services/avaliacaoService";
import { listarFrequencias } from "../services/frequenciaService";
import { listarProfessores } from "../services/professorService";
import { listarTurmas } from "../services/turmaService";

function Dashboard() {
  const [quantAlunos, setQuantAlunos] = useState(0);
  const [quantProfessores, setQuantProfessores] = useState(0);
  const [quantTurmas, setQuantTurmas] = useState(0);
  const [turmas, setTurmas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);

  useEffect(() => {
    async function carregarContagens() {
      try {
        const [alunos, professores, turmas, avaliacoesData, frequenciasData] = await Promise.all([
          listarAlunos(),
          listarProfessores(),
          listarTurmas(),
          listarAvaliacoes(),
          listarFrequencias(),
        ]);

        setQuantAlunos((alunos || []).length);
        setQuantProfessores((professores || []).length);
        setQuantTurmas((turmas || []).length);
        setTurmas(turmas || []);
        setAvaliacoes(avaliacoesData || []);
        setFrequencias(frequenciasData || []);
      } catch (err) {
        console.error("Erro ao carregar contagens:", err);
      }
    }

    carregarContagens();
  }, []);

  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <Header />

        <h2 className="mb-4">📊 Painel Geral</h2>

        <div className="cards">
          <Card titulo="👨‍🎓 Alunos" valor={String(quantAlunos)} />
          <Card titulo="👨‍🏫 Professores" valor={String(quantProfessores)} />
          <Card titulo="🏫 Turmas" valor={String(quantTurmas)} />
        </div>

        <div className="card mt-4 p-3">
          <h4>Turmas</h4>
          <div className="row">
            {turmas.map((turma) => (
              <div className="col-md-3 mb-3" key={turma.id}>
                <div
                  className="card p-2 h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedTurma(turma)}
                >
                  <strong>{turma.nome}</strong>
                  <div>Alunos: {(turma.alunos || []).length}</div>
                  <div>Professores: {(turma.professores || []).length}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedTurma && (
            <div className="mt-3">
              <h5>Detalhes - {selectedTurma.nome}</h5>
              <div className="row">
                <div className="col-md-6">
                  <h6>Professores</h6>
                  <ul>
                    {(selectedTurma.professores || []).map((p) => (
                      <li key={p.id}>{p.nome} ({p.disciplina})</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Alunos</h6>
                  <ul>
                    {(selectedTurma.alunos || []).map((a) => {
                      const alunoAvaliacoes = avaliacoes
                        .filter((item) => Number(item.turmaId) === Number(selectedTurma.id) && Number(item.alunoId) === Number(a.id))
                        .sort((left, right) => new Date(right.data) - new Date(left.data));
                      const ultimaAvaliacao = alunoAvaliacoes[0];

                      const alunoFrequencias = frequencias
                        .filter((item) => Number(item.turmaId) === Number(selectedTurma.id) && Number(item.alunoId) === Number(a.id))
                        .sort((left, right) => new Date(right.data) - new Date(left.data));
                      const ultimaFrequencia = alunoFrequencias[0];

                      return (
                        <li key={a.id} className="mb-3">
                          <strong>{a.nome}</strong> ({a.matricula || a.id})
                          <div>
                            <small>
                              Avaliação: {ultimaAvaliacao ? `${ultimaAvaliacao.media} (Prof. ${ultimaAvaliacao.professorNome})` : "-"}
                            </small>
                          </div>
                          <div>
                            <small>
                              Frequência: {ultimaFrequencia ? `${ultimaFrequencia.percentual}% (${ultimaFrequencia.presentes}/${ultimaFrequencia.totalAulas}) Professor: ${ultimaFrequencia.professorNome}` : "-"}
                            </small>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}

export default Dashboard;