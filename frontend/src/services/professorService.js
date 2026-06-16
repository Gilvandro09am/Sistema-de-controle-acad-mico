import API from "./api";

export const listarProfessores = async () => {
  const response = await API.get("/professores");
  return response.data;
};

export const cadastrarProfessor = async (professor) => {
  const response = await API.post("/professores", professor);
  return response.data;
};

export const excluirProfessor = async (id) => {
  await API.delete(`/professores/${id}`);
};
