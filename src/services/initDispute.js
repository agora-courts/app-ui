import axios from "axios";
import getATA from "../utils/getATA";
import { ENDPOINTS } from "@data/constants.js";
import * as anchor from '@coral-xyz/anchor';
import getAsset from "./getAsset";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import createRecordChecked from "../utils/createRecordChecked";

const initDispute = async (config, program) => {
    // config -> courtName, disputeID: anchor.BN, repMint: PublicKey, payMint: PublicKey
    const courtName = config.courtName;
    const repMint = config.repMint;
    const payMint = config.payMint;

    const courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;
    let courtState = await program.account.court.fetch(courtPDA);

    const disputePDA = findProgramAddress("dispute", program.programId, [courtPDA, courtState.numDisputes]).publicKey;
    
    const repVaultATA = getATA(repMint, disputePDA);
    const payVaultATA = getATA(payMint, disputePDA);

    let curTime = Math.floor(Date.now() / 1000);

    let disputeConfig = {
        graceEndsAt: new anchor.BN(curTime + 20*60), //20 min
        initCasesEndsAt: new anchor.BN(curTime + 40*60), //+20 min
        votingEndsAt: new anchor.BN(curTime + 60*60), //+20 min
        disputeEndsAt: new anchor.BN(curTime + 80*60), //+20 min
        voterRepRequired: new anchor.BN(5),
        voterRepCost: new anchor.BN(2),
        repCost: new anchor.BN(10),
        payCost: new anchor.BN(5),
        minVotes: new anchor.BN(1),
        protocolPay: new anchor.BN(0),
        protocolRep: new anchor.BN(0)
    }

    try {
        await program.methods
            .initializeDispute(
                courtName,
                [null, null],
                disputeConfig
            )
            .acccounts({
            })
            .rpc()
     
    } catch (err) {
        throw err;
    }
};

export default initDispute;
