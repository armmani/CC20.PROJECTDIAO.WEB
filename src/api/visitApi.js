import axiosCenter from "./axiosCenter";

const visitApi = {
  getAllVisits: () => axiosCenter.get("/visits"),
  getVisitById: (id) => axiosCenter.get(`/visits/${id}`),
  createVisit: (visitData) => axiosCenter.post("/visits", visitData),
  updateVisit: (id, updateVisitData) =>
    axiosCenter.patch(`/visits/${id}`, updateVisitData),
  visitAllMedications: (visitId) =>
    axiosCenter.get(`/visits/${visitId}/medications`),
  visitAddMedications: (visitId, payload) =>
    axiosCenter.post(`/visits/${visitId}/medications`, payload),
  visitAllProcedures: (visitId) =>
    axiosCenter.get(`/visits/${visitId}/procedures`),
  visitAddProcedures: (visitId, procData) =>
    axiosCenter.post(`/visits/${visitId}/procedures`, procData),
  softDeleteVIsit: (visitId) =>
    axiosCenter.patch(`/visits/${visitId}`, { status: "INACTIVE" }),
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
  softDeleteVIsit,
} = visitApi;
