import axiosCenter from "./axiosCenter";

const medicationApi = {
  getAllMeds: () => axiosCenter.get("/medications"),
  getMedById: (id) => axiosCenter.get(`/medications/${id}`),
  createMed: (medData) => axiosCenter.post("/medications", medData),
  updateMed: (id, updateMedData) => axiosCenter.patch(`/medications/${id}`, updateMedData),
  deleteMed: (id) => axiosCenter.delete(`/medications/${id}`),
};

export const { getAllMeds, getMedById, createMed, updateMed, deleteMed } =
  medicationApi;
