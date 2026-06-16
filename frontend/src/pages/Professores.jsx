import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import {
  cadastrarProfessor,
  excluirProfessor,
  listarProfessores
} from "../services/professorService";

function Professores() {
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function carregarProfessores() {
      const dados = await listarProfessores();
      setProfessores(dados);
    }

    carregarProfessores();
  }, []);

  async function salvarProfessor() {
    if (!nome || !disciplina || !email) {
      alert("Preencha todos os campos");
      return;
    }

    await cadastrarProfessor({
      nome,
      disciplina,
      email
    });

    setNome("");
    setDisciplina("");
    setEmail("");

    const dados = await listarProfessores();
    setProfessores(dados);
  }

  async function removerProfessor(id) {
    await excluirProfessor(id);
    const dados = await listarProfessores();
    setProfessores(dados);
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Header />

        <h1 className="mb-4">Gerenciamento de Professores</h1>

        <div className="card p-4 mb-4">
          <h4>Novo Professor</h4>
          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Disciplina"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-2 mt-3">
              <button
                className="btn btn-success w-100"
                onClick={salvarProfessor}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h4>Lista de Professores</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Disciplina</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.nome}</td>
                  <td>{professor.disciplina}</td>
                  <td>{professor.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removerProfessor(professor.id)}
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

export default Professores; 