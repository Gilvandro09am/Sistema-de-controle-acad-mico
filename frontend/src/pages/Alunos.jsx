import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Alunos() {

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Header />

        <h1>Alunos</h1>

        <table>

          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Idade</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Carlos Henrique</td>
              <td>2025001</td>
              <td>17</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Alunos;