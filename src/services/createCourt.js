import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const createCourt = async (court, program) => {
  let { name, ...config } = court;

  try {
    let token_metadata = await getAsset([
      config.reputationToken,
      config.paymentToken,
    ]);

    config.reputationToken = token_metadata[0];
    config.paymentToken = token_metadata[1];

    console.log("Creating court with ", config.maxDisputes, " votes!");

    await program.methods
      .initializeCourt(name, config.maxDisputes)
      .accounts({
        court: findProgramAddress("court", program.programId, name).publicKey,
        authority: program.provider.publicKey,
        protocol: config.projectAddress,
        repMint: config.reputationToken.mintAddress,
        payMint: config.paymentToken.mintAddress,
        systemProgram: SystemProgram.programId,
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
