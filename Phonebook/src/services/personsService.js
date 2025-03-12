import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

export const getAllPersons = async () => {
  try {
    const response = await axios.get(BASE_URL);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch persons:", error.message);
  }
};

export const addPerson = async (newPerson) => {
  try {
    const response = await axios.post(BASE_URL, newPerson);

    return response.data;
  } catch (error) {
    throw new Error("Failed to add person: " + error.message);
  }
};

export const deletePerson = async (id) => {
  try {
    const url = `${BASE_URL}/${id}`;

    await axios.delete(url);
  } catch (error) {
    throw new Error("Failed to delete person: " + error.message);
  }
};

export const updatePerson = async (id, updatedData) => {
  try {
    const url = `${BASE_URL}/${id}`;
    const response = await axios.put(url, updatedData);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update person:", error.message);
  }
};
