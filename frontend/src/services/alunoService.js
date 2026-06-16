import axios from "axios";

const API = "http://localhost:3000/alunos";

export const listarAlunos = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const cadastrarAluno = async (aluno) => {
  const response = await axios.post(API, aluno);
  return response.data;
};

export const excluirAluno = async (id) => {
  await axios.delete(`${API}/${id}`);
};