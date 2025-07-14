import axiosCenter from "./axiosCenter";

const procedureApi = {
  getAllProcedures: () => axiosCenter.get("/procedures"),
  getProcedureById: (id) => axiosCenter.get(`/procedures/${id}`),
  createProcedure: (procedureData) => axiosCenter.post("/procedures", procedureData),
  updateProcedure: (id, updateProcedureData) => axiosCenter.patch(`/procedures/${id}`, updateProcedureData),
  deleteProcedure: (id) => axiosCenter.delete(`/procedures/${id}`),
};

export const {
  getAllProcedures,
  getProcedureById,
  createProcedure,
  updateProcedure,
  deleteProcedure,
} = procedureApi;
