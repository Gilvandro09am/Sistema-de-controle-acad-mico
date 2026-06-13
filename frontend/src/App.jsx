import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores";
import Turmas from "./pages/Turmas";
<<<<<<< HEAD
=======
import Avaliacoes from "./pages/Avaliacoes";
import Frequencias from "./pages/Frequencias";

import "./App.css";
>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/turmas" element={<Turmas />} />
      </Routes>
=======

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/alunos" element={<Alunos />} />

        <Route path="/professores" element={<Professores />} />

        <Route path="/turmas" element={<Turmas />} />

        <Route path="/avaliacoes" element={<Avaliacoes />} />

        <Route path="/frequencias" element={<Frequencias />} />

      </Routes>

>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 41b03e7ec4602fce44abe67dfab26174aeb5cf5b
