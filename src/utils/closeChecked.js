import findProgramAddress from "./findProgramAddress";
import { SystemProgram, Transaction } from "@solana/web3.js";

const closeDisputeChecked = async (tx, courtName, disputeID, program) => {
  const courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;
  const disputePDA = findProgramAddress("dispute", program.programId, [courtPDA, disputeID]).publicKey;

  try {
    let disputeState = await program.account.dispute.fetch(disputePDA);
    if (Object.keys(disputeState.status)[0] != "concluded") {
        tx.add(
            await program.methods
              .closeDispute(disputeID)
              .accounts({
                  dispute: disputePDA,
                  court: courtPDA,
                  payer: program.provider.publicKey,
              })
              .instruction()
          )
    }
  } catch(e) {
    throw e;
  }

  return tx;
};

export default closeDisputeChecked;
