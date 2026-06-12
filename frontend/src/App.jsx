import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores";
import Turmas from "./pages/Turmas";
import Avaliacoes from "./pages/Avaliacoes";
import Frequencias from "./pages/Frequencias";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/alunos" element={<Alunos />} />

        <Route path="/professores" element={<Professores />} />

        <Route path="/turmas" element={<Turmas />} />

        <Route path="/avaliacoes" element={<Avaliacoes />} />

        <Route path="/frequencias" element={<Frequencias />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;