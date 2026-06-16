import API from "./api";

export const listarAvaliacoes = async () => {
  const response = await API.get("/avaliacoes");
  return response.data;
};

export const cadastrarAvaliacao = async (avaliacao) => {
  const response = await API.post("/avaliacoes", avaliacao);
  return response.data;
};

export const excluirAvaliacao = async (id) => {
  await API.delete(`/avaliacoes/${id}`);
};
