import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const createCase = async (config, program) => {
  // config -> courtName, disputeID: anchor.BN, evidence: string
  const courtName = config.courtName;
  const disputeID = config.disputeID;
  const evidence = config.evidence;

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
    program.provider.publicKey,
  ]).publicKey;

  try {
    await program.methods
      .initializeCase(courtName, disputeID, evidence)
      .accounts({
        case: casePDA,
        voterRecord: recordPDA,
        dispute: disputePDA,
        court: courtPDA,
        payer: program.provider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    throw err;
  }
};

export default createCase;
