import axiosCenter from "./axiosCenter";

const visitMedicationApi = {
  visitUpdateMedication: (id, updateVisitUpdateMedicationData) =>
    axiosCenter.patch(
      `/visit-medications/${id}`,
      updateVisitUpdateMedicationData
    ),
  visitDeleteMedication: (id) => axiosCenter.delete(`/visit-medications/${id}`),
};

export const { visitUpdateMedication, visitDeleteMedication } =
  visitMedicationApi;
