import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      email === "gilvandro.martins@aluno.uepb.edu.br" &&
      senha === "12345678"
    ) {
      localStorage.setItem("logado", "true");
      navigate("/dashboard");
    } else {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="text-center mb-4">
          <div className="logo-circle">🎓</div>
          <h2 className="fw-bold">Sistema Acadêmico</h2>
          <p className="text-muted">Plataforma de Gestão Escolar</p>
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type={mostrarSenha ? "text" : "password"}
            className="form-control"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          className="btn btn-primary w-100 mb-2"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <button className="btn btn-outline-primary w-100">
          Criar Conta
        </button>
      </div>
    </div>
  );
}

export default Login;
