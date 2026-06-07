import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Login realizado com sucesso!");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🎓 Sistema Acadêmico</h1>

        <p>Controle de alunos, turmas e avaliações</p>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={handleLogin}>
          Entrar
        </button>

      </div>

    </div>
  );
}

export default Login;