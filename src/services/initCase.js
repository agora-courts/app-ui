import axios from "axios";
import { ENDPOINTS } from "@data/constants.js";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const initCase = async (config, program) => {
    // config -> courtName, disputeID: anchor.BN, evidence: string
    const courtName = config.courtName;
    const disputeID = config.disputeID;
    const evidence = config.evidence;

    const courtPDA = findProgramAddress("court", courtName).publicKey;
    const recordPDA = findProgramAddress("record", [courtPDA, program.provider.publicKey]).publicKey;
    const disputePDA = findProgramAddress("dispute", [courtPDA, disputeID]).publicKey;
    const casePDA = findProgramAddress("case", [disputePDA, program.provider.publicKey]);

    try {
        await program.methods
            .initializeCase(
                courtName,
                disputeID,
                evidence
            )
            .acccounts({
                case: casePDA,
                voterRecord: recordPDA,
                dispute: disputePDA,
                court: courtPDA,
                payer: program.provider.publicKey,
                systemProgram: SystemProgram.programId
            })
            .rpc()

    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default initCase;
