import API from "./api";

export const listarFrequencias = async () => {
  const response = await API.get("/frequencias");
  return response.data;
};

export const cadastrarFrequencia = async (frequencia) => {
  const response = await API.post("/frequencias", frequencia);
  return response.data;
};

export const excluirFrequencia = async (id) => {
  await API.delete(`/frequencias/${id}`);
};
