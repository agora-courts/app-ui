import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

export const login = async (message, signature) => {
  try {
    await axios.post(
      `${ENDPOINTS.AUTH}/login`,
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

export const logout = async () => {
  try {
    await axios.get(`${ENDPOINTS.AUTH}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (err) {
    throw err;
  }
};
