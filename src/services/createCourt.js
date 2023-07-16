import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";

const createCourt = async (court) => {
  let { name, ...config } = court;

  try {
    config.reputationToken = await getAsset(config.reputationToken);
    config.paymentToken = await getAsset(config.paymentToken);

    await axios.post(ENDPOINTS.COURTS, {
      name,
      config,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response.data);
    else throw err;
  }
};

export default createCourt;
