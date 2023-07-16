import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getCourts = async () => {
  try {
    const response = await axios.get(ENDPOINTS.COURTS);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export default getCourts;
