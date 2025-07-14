import axiosCenter from "./axiosCenter";

const ownerApi = {
  getAllOwners: () => axiosCenter.get("/owners"),
  getOwnerById: (id) => axiosCenter.get(`/owners/${id}`),
  createOwner: (ownerData) => axiosCenter.post("/owners", ownerData),
  updateOwner: (id, updateOwnerData) => axiosCenter.patch(`/owners/${id}`, updateOwnerData),
  getPetByOwner: (ownerId) => axiosCenter.get(`/${ownerId}/pets`),
};

export const {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  getPetByOwner,
} = ownerApi;
