import findProgramAddress from "../utils/findProgramAddress";
import { ENDPOINTS } from "@data/constants.js";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";

const revealVote = async (config, program) => {
  const courtName = config.courtName;
  const disputeID = config.disputeID;
  const candidateAcc = new PublicKey(config.vote);
  let salt = config.salt;

  const courtPDA = findProgramAddress(
    "court",
    program.programId,
    courtName
  ).publicKey;
  const recordPDA = findProgramAddress("record", program.programId, [
    courtPDA,
    program.provider.publicKey,
  ]).publicKey;
  const disputePDA = findProgramAddress("dispute", program.programId, [
    courtPDA,
    disputeID,
  ]).publicKey;
  const casePDA = findProgramAddress("case", program.programId, [
    disputePDA,
    candidateAcc,
  ]).publicKey;

  try {
    await program.methods
      .revealVote(courtName, disputeID, salt)
      .accounts({
        case: casePDA,
        candidate: candidateAcc,
        voterRecord: recordPDA,
        dispute: disputePDA,
        court: courtPDA,
        payer: program.provider.publicKey,
      })
      .rpc();
  } catch (err) {
    throw err;
  }
};

export default revealVote;
