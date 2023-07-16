// import { PublicKey } from "@solana/web3.js";
// import * as anchor from "@coral-xyz/anchor";
import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";

const getCourt = async (name) => {
  // const [protocolPDA] = PublicKey.findProgramAddressSync(
  //   [anchor.utils.bytes.utf8.encode("protocol")],
  //   new PublicKey(protocolPK)
  // );

  // const [courtPDA] = PublicKey.findProgramAddressSync(
  //   [anchor.utils.bytes.utf8.encode("court"), protocolPDA.toBuffer()],
  //   program.programId
  // );

  // const courtState = await program.account.court.fetch(courtPDA);
  // return courtState;
  try {
    const response = await axios.get(`${ENDPOINTS.COURTS}/${name}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export default getCourt;
