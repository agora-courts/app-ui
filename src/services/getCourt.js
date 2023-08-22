import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getCourt = async (name) => {
  try {
    const response = await axios.get(`${ENDPOINTS.COURTS}/${name}`);
    return response.data
  } catch (error) {
    console.log(error);
  }
};

export default getCourt;
