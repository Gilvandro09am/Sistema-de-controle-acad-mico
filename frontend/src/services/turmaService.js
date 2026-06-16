import API from "./api";

export const listarTurmas = async () => {
  const response = await API.get("/turmas");
  return response.data;
};

export const cadastrarTurma = async (turma) => {
  const response = await API.post("/turmas", turma);
  return response.data;
};

export const excluirTurma = async (id) => {
  await API.delete(`/turmas/${id}`);
};
