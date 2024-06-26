import getATA from "../utils/getATA";
import * as anchor from "@coral-xyz/anchor";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const createDispute = async (config, program) => {
  // config -> courtName, repMint: PublicKey, payMint: PublicKey
  const courtName = config.courtName;
  const repMint = config.repMint;
  const payMint = config.payMint;

  const courtPDA = findProgramAddress(
    "court",
    program.programId,
    courtName
  ).publicKey;
  let courtState = await program.account.court.fetch(courtPDA);

  const disputePDA = findProgramAddress("dispute", program.programId, [
    courtPDA,
    courtState.numDisputes,
  ]).publicKey;

  const repVaultATA = getATA(repMint, disputePDA);
  const payVaultATA = getATA(payMint, disputePDA);

  let curTime = Math.floor(Date.now() / 1000);
  let disputeConfig = {
    graceEndsAt: new anchor.BN(curTime + 1 * 60), //10 min
    initCasesEndsAt: new anchor.BN(curTime + 2 * 60), //+10 min
    votingEndsAt: new anchor.BN(curTime + 3 * 60), //+10 min
    disputeEndsAt: new anchor.BN(curTime + 4 * 60), //+10 min
    voterRepRequired: new anchor.BN(5),
    voterRepCost: new anchor.BN(2),
    repCost: new anchor.BN(10),
    payCost: new anchor.BN(5),
    minVotes: new anchor.BN(1),
    protocolPay: new anchor.BN(0),
    protocolRep: new anchor.BN(0),
  };

  try {
    await program.methods
      .initializeDispute(
        courtName, 
        [null, null], 
        disputeConfig
      )
      .accounts({
        dispute: disputePDA,
        repVault: repVaultATA,
        payVault: payVaultATA, //NULL
        court: courtPDA,
        payer: program.provider.publicKey,
        protocol: program.provider.publicKey,
        protocolRepAta: program.programId, //NULL
        protocolPayAta: program.programId, //NULL
        repMint: repMint,
        payMint: payMint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
      })
      .rpc();
  } catch (err) {
    throw err;
  }
};

export default createDispute;
