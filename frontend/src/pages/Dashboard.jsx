import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <Header />

        <h1>Painel Geral</h1>

        <div className="cards">

          <Card
            titulo="Alunos"
            valor="120"
          />

          <Card
            titulo="Professores"
            valor="18"
          />

          <Card
            titulo="Turmas"
            valor="8"
          />

          <Card
            titulo="Média Geral"
            valor="8.7"
          />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;