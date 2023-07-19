import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";
import useProgram from "../hooks/useProgram";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const createCourt = async (court) => {
  let { name, ...config } = court;
  let program = useProgram();

  try {
    config.reputationToken = await getAsset(config.reputationToken);
    config.paymentToken = await getAsset(config.paymentToken);

    await program.methods
      .initializeCourt(
        name,
        config.maxVotes
      )
      .accounts({
        court: findProgramAddress("court", name).publicKey,
        authority: program.provider.publicKey,
        protocol: config.protocol,
        repMint: config.reputationToken.mintAddress,
        payMint: config.paymentToken.mintAddress,
        systemProgram: SystemProgram.programId
      })
      .rpc();

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
