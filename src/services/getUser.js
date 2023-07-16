import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getUser = async () => {
  try {
    const response = await axios.get(`${ENDPOINTS.USERS}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getUser;
