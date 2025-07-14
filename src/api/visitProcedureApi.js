import axiosCenter from "./axiosCenter";

const visitProcedureApi = {
  visitUpdateProcedure: (id, updateVisitUpdateProcedure) =>
    axiosCenter.patch(`/visit-procedures/${id}`, updateVisitUpdateProcedure),
  visitDeleteProcedure: (id) => axiosCenter.delete(`/visit-procedures/${id}`),
};

export const { visitUpdateProcedure, visitDeleteProcedure } = visitProcedureApi;
