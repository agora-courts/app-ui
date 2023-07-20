import findProgramAddress from "../utils/findProgramAddress";

const revealVote = async (config, program) => {
  // config -> courtName, disputeID: anchor.BN, candidateAcc: PublicKey, salt: string
  const courtName = config.courtName;
  const disputeID = config.disputeID;
  const candidateAcc = config.candidateAcc;
  const salt = config.salt;

  const courtPDA = findProgramAddress("court", courtName).publicKey;
  const recordPDA = findProgramAddress("record", [
    courtPDA,
    program.provider.publicKey,
  ]).publicKey;
  const disputePDA = findProgramAddress("dispute", [
    courtPDA,
    disputeID,
  ]).publicKey;
  const casePDA = findProgramAddress("case", [
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
    console.log(err);
    throw err;
  }
};

export default revealVote;
