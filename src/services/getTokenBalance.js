import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getTokenBalance = async (mintAddress, walletAddress) => {
  try {
    const { data } = await axios.get(
      `${ENDPOINTS.TOKENS}/balance/${walletAddress}`
    );

    for (let token of data.tokens) {
      if (token.mint === mintAddress) {
        return token.amount / 10 ** token.decimals;
      }
    }
  } catch (err) {
    throw err;
  }

  return 0;
};

export default getTokenBalance;
