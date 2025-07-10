import { addToken } from "../stores/authStore";

const petApi = axios.create({
  baseURL: "http://localhost:6969/pets",
});

export const getAllPets = (token) => {
  petApi.get("/", addToken(token))
}

export const getPetById = (id, token) => {
petApi.get(`/${id}`, addToken(token))
}

export const createPet = (pet_name, species, breed, gender, sterilization, birth_date, status) => {
  petApi.post("/", addToken(token))
}