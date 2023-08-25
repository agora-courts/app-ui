import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getAsset = async (mintAccounts) => {
  try {
    const { data } = await axios.post(`${ENDPOINTS.TOKENS}/metadata`, {
      mintAccounts,
    });

    return data.map((token) => ({
      mintAddress: token.account,
      ticker:
        token.onChainMetadata.metadata?.data?.symbol ||
        token.account.slice(0, 4) + ".." + token.account.slice(-4),
      logo: token.offChainMetadata.metadata?.image || "",
    }));
  } catch (e) {
    throw new Error("Invalid token mint address");
  }
};

export default getAsset;
