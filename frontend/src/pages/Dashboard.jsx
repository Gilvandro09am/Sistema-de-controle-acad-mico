import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <Header />

        <h2 className="mb-4">
          📊 Painel Geral
        </h2>

        <div className="cards">

          <Card titulo="👨‍🎓 Alunos" valor="120" />

          <Card titulo="👨‍🏫 Professores" valor="15" />

          <Card titulo="🏫 Turmas" valor="8" />

          <Card titulo="📝 Avaliações" valor="45" />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;