import axiosCenter from "./axiosCenter";

const petApi = {
  getAllPets: () => axiosCenter.get("/pets"),
  getPetById: (id) => axiosCenter.get(`/pets/${id}`),
  createPet: (petData) => axiosCenter.post("/pets", petData),
  updatePet: (petId, updatePetData) =>
    axiosCenter.patch(`/pets/${petId}`, updatePetData),
};

export const {createPet, getAllPets, getPetById, updatePet} = petApi
