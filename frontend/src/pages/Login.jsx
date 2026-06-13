import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  function entrar() {
    navigate("/dashboard");
  }

  return (
    <div className="login">

      <h1>Sistema Acadêmico</h1>

      <input
        type="email"
        placeholder="Email"
      />

      <input
        type="password"
        placeholder="Senha"
      />

      <button onClick={entrar}>
        Entrar
      </button>

    </div>
  );
}

export default Login; 