import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import getAsset from "./getAsset";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import getCourt from "./getCourt";

const createCourt = async (court, program) => {
  let { name, ...config } = court;

  try {
    // let nameExists = false;
    // try {
    //   await getCourt(name);
    //   nameExists = true;
    // } catch (e) {}
    // if (nameExists) throw new Error("Court name already exists");
    let c = await getCourt(name);
    if (typeof c === 'object' && c !== null) {
      throw new Error("Court name already exists");
    }

    let token_metadata = await getAsset([
      config.reputationToken,
      config.paymentToken,
    ]);

    config.reputationToken = token_metadata[0];
    config.paymentToken = token_metadata[1];

    let courtPDA = findProgramAddress(
      "court",
      program.programId,
      name
    ).publicKey;

    await program.methods
      .initializeCourt(name, config.maxDisputes)
      .accounts({
        court: courtPDA,
        authority: program.provider.publicKey,
        protocol: config.projectAddress,
        repMint: config.reputationToken.mintAddress,
        payMint: config.paymentToken.mintAddress,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    let publicKey = courtPDA.toString();

    await axios.post(ENDPOINTS.COURTS, {
      name,
      config,
      publicKey,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response.data);
    else throw err;
  }
};

export default createCourt;
