<<<<<<< HEAD
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
=======
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b
import Card from "../components/Card";

function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

<<<<<<< HEAD
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
=======
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
>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b

    </div>
  );
}

export default Dashboard;