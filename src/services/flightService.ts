import api from "../utility/apiClient";

export const searchAirports = async (query: string, locale = "en-US") => {
  try {
    const response = await api.get("/v1/flights/searchAirport", {
      params: {
        query,
        locale
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch airports:", error);
    throw error;
  }
};