import getATA from "../utils/getATA";
import closeDisputeChecked from "../utils/closeChecked";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const claimDisputes = async (config, program) => {
  // config -> courtName, disputeID: anchor.BN, repMint: PublicKey, candidateAcc: PublicKey
  const courtName = config.courtName;
  const disputeID = config.disputeID;
  const repMint = config.repMint;
  const payMint = config.payMint;

  const courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;
  const recordPDA = findProgramAddress("record", program.programId, [
    courtPDA,
    program.provider.publicKey,
  ]).publicKey;
  const disputePDA = findProgramAddress("dispute", program.programId, [
    courtPDA,
    disputeID,
  ]).publicKey;
  const repVaultATA = getATA(repMint, disputePDA);
  const payVaultATA = getATA(payMint, disputePDA);
  const userRepATA = getATA(repMint, program.provider.publicKey);
  const userPayATA = getATA(payMint, program.provider.publicKey);

  try {
    let tx = await closeDisputeChecked(courtName, disputeID, program);

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

    await program.provider.sendAndConfirm(tx);
  } catch (err) {
    throw err;
  }
};

export default claimDisputes;
