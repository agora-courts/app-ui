import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";

const updateCourt = async (name, config) => {
  for (let k in config) config[k] == "" && delete config[k];

  try {
    let token_metadata = await getAsset([
      config.reputationToken,
      config.paymentToken,
    ]);
    config.reputationToken = token_metadata[0];
    config.paymentToken = token_metadata[1];

    await axios.patch(`${ENDPOINTS.COURTS}/${name}`, config, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response.data);
    else throw err;
  }
};

export default updateCourt;
