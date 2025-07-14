import axiosCenter from "./axiosCenter";

const visitApi = {
  getAllVisits: () => axiosCenter.get("/visits"),
  getVisitById: (id) => axiosCenter.get(`/visits/${id}`),
  createVisit: (visitData) => axiosCenter.post("/visits", visitData),
  updateVisit: (id, updateVisitData) => axiosCenter.patch(`/visits/${id}`, updateVisitData),
  visitAllMedications: (visitId) => axiosCenter.get(`/${visitId}/medications`),
  visitAddMedications: (visitId) => axiosCenter.post(`/${visitId}/medications`),
  visitAllProcedures: (visitId) => axiosCenter.get(`/${visitId}/procedures`),
  visitAddProcedures: (visitId) => axiosCenter.post(`/${visitId}/procedures`),
};

export const {
  getAllVisits,
  getVisitById,
  createVisit,
  updateVisit,
  visitAllMedications,
  visitAddMedications,
  visitAllProcedures,
  visitAddProcedures,
} = visitApi;
