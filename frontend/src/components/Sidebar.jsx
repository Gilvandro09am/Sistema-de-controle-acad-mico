import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

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

      </ul>

    </aside>
  );
}

export default Sidebar;