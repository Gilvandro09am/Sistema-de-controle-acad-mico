import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/alunos">Alunos</Link>

      <Link to="/professores">Professores</Link>

      <Link to="/turmas">Turmas</Link>

    </aside>
  );
}

export default Sidebar;