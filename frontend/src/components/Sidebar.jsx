import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

<<<<<<< HEAD
      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/alunos">Alunos</Link>

      <Link to="/professores">Professores</Link>

      <Link to="/turmas">Turmas</Link>
=======
      <h2>🎓 STC</h2>

      <ul>

        <li>
          <Link to="/dashboard">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/alunos">
            👨‍🎓 Alunos
          </Link>
        </li>

        <li>
          <Link to="/professores">
            👨‍🏫 Professores
          </Link>
        </li>

        <li>
          <Link to="/turmas">
            🏫 Turmas
          </Link>
        </li>

        <li>
          <Link to="/avaliacoes">
            📝 Avaliações
          </Link>
        </li>

        <li>
          <Link to="/frequencias">
            📅 Frequências
          </Link>
        </li>

      </ul>
>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b

    </aside>
  );
}

export default Sidebar;