import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";

const updateCourt = async (name, config) => {
  for (let k in config) config[k] == "" && delete config[k];

  try {
    config.reputationToken = await getAsset(config.reputationToken);
    config.paymentToken = await getAsset(config.paymentToken);

    await axios.patch(`${ENDPOINTS.COURTS}/${name}`, config);
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response.data);
    else throw err;
  }
};

export default updateCourt;
