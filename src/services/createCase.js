import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const createCase = async (config, program) => {
    // config -> courtName, disputeID: anchor.BN, evidence: string
    const courtName = config.courtName;
    const disputeID = config.disputeID;
    const evidence = config.evidence;

    const courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;
    const recordPDA = findProgramAddress("record", program.programId, [courtPDA, program.provider.publicKey]).publicKey;
    const disputePDA = findProgramAddress("dispute", program.pgoramId, [courtPDA, disputeID]).publicKey;
    const casePDA = findProgramAddress("case", program.programId, [disputePDA, program.provider.publicKey]);

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

export default createCase;
