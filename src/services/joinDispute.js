import getATA from "../utils/getATA";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import createRecordChecked from "../utils/createRecordChecked";

const joinDispute = async (config, program) => {
  // config -> courtName, disputeID: anchor.BN, repMint: PublicKey, payMint: PublicKey
  // should make pay mint optional and handle that later, but for now wtv
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

  let userRepAcc = await program.provider.connection.getAccountInfo(userRepATA);
  let userPayAcc = await program.provider.connection.getAccountInfo(userPayATA);

  try {
    if (userRepAcc == null || userPayAcc == null) {
      throw new Error("Not enough reputation or money to join dispute!");
    }

    let tx = await createRecordChecked(courtName, program);

    tx.add(
      await program.methods
        .interact(courtName, disputeID)
        .acccounts({
          dispute: disputePDA,
          repVault: repVaultATA,
          payVault: payVaultATA,
          record: recordPDA,
          court: courtPDA,
          user: program.provider.publicKey, //signer
          userRepAta: userRepATA,
          userPayAta: userPayATA,
          repMint: repMint,
          payMint: payMint,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .instruction()
    );

    await program.provider.sendAndConfirm(tx);
  } catch (err) {
    throw err;
  }
};

export default joinDispute;
