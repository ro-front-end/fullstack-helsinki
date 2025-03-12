import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/all`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get coountries: ${error.message}`);
  }
};

export const getCountryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/name/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(`Couldn't get country: ${error.message}`);
  }
};
