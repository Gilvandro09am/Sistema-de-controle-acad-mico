import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Header />

        <h1>Dashboard</h1>

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

        </div>

      </div>

    </div>
  );
}

export default Dashboard;