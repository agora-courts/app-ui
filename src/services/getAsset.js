import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getAsset = async (mintAddress) => {
  try {
    const { data } = await axios.post(`${ENDPOINTS.TOKENS}/metadata`, {
      id: mintAddress,
    });

    let content = data.result.content;
    return {
      mintAddress,
      ticker: content.metadata.symbol,
      logo: content.files[0]?.uri,
    };
  } catch (e) {
    throw new Error("Invalid token mint address");
  }
};

export default getAsset;
