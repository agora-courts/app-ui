import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const login = async (message, signature) => {
  try {
    await axios.post(
      ENDPOINTS.AUTH,
      {
        message,
        signature,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    throw err;
  }
};

export default login;
