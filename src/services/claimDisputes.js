import getATA from "../utils/getATA";
import closeDisputeChecked from "../utils/closeChecked";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const claimDisputes = async (config, program) => {
  const courtName = config.courtName;

  const courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;

  let courtState = await program.account.court.fetch(courtPDA);
  console.log("courtstate: ", courtState);
  const repMint = courtState.repMint;
  const payMint = courtState.payMint;

  const recordPDA = findProgramAddress("record", program.programId, [
    courtPDA,
    program.provider.publicKey,
  ]).publicKey;
  const userRepATA = getATA(repMint, program.provider.publicKey);
  const userPayATA = getATA(payMint, program.provider.publicKey);

  let recordState = await program.account.voterRecord.fetch(recordPDA);
  let queue = recordState.claimQueue;

  let tx = new Transaction();

  try {
    let curTime = Math.floor(Date.now() / 1000);

    for (let i = queue.length - 1; i >= 0; i--) {
      if (queue[i].disputeEndTime.toNumber() < curTime) {
        let disputeID = queue[i].disputeId;

        let disputePDA = findProgramAddress("dispute", program.programId, [
          courtPDA,
          disputeID,
        ]).publicKey;
        let repVaultATA = getATA(repMint, disputePDA);
        let payVaultATA = getATA(payMint, disputePDA);

        tx = await closeDisputeChecked(tx, courtName, disputeID, program);

        tx.add(
          await program.methods
            .claim(courtName, disputeID)
            .accounts({
              voterRecord: recordPDA,
              dispute: disputePDA,
              repVault: repVaultATA,
              payVault: payVaultATA,
              court: courtPDA,
              user: program.provider.publicKey,
              userPayAta: userPayATA,
              userRepAta: userRepATA,
              repMint: repMint,
              payMint: payMint,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            })
            .instruction()
        );

      } else {
        break;
      }
    }

    if (tx.instructions.length > 0) {
      await program.provider.sendAndConfirm(tx);
    }
  } catch (err) {
    throw err;
  }
};

export default claimDisputes;
