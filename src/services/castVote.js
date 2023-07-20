import createSalt from "../utils/createSalt";
import getATA from "../utils/getATA";
import createRecordChecked from "../utils/createRecordChecked";
import keccak from "keccak";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

const castVote = async (config, program) => {
  // save salt to DB? -> needs to be correlated with this specific vote
  const courtName = config.courtName;
  const disputeID = config.disputeID;
  const repMint = config.repMint;
  const candidateAcc = config.candidateAcc;

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
  const userRepATA = getATA(repMint, program.provider.publicKey);

  let userRepAcc = await program.provider.connection.getAccountInfo(userRepATA);

  let salt = createSalt();
  console.log("SALT:", salt);
  let buf = Buffer.concat([
    candidateAcc.toBuffer(),
    Buffer.from(salt, "utf-8"),
  ]);
  let hash = keccak("keccak256").update(buf).digest();
  let hashArr = Array.from(new Uint8Array(hash));

  try {
    let tx = await createRecordChecked(courtName, program);

    if (userRepAcc == null) {
      tx.add(
        createAssociatedTokenAccountInstruction(
          program.provider.publicKey,
          userRepATA,
          program.provider.publicKey,
          repMint
        )
      );
    }

    tx.add(
      await program.methods
        .selectVote(courtName, disputeID, hashArr)
        .accounts({
          voterRecord: recordPDA,
          dispute: disputePDA,
          repVault: repVaultATA,
          court: courtPDA,
          repMint: repMint,
          payer: program.provider.publicKey,
          userRepAta: userRepATA,
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

export default castVote;
