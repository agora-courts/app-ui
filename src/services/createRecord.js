import useProgram from "../hooks/useProgram";
import findProgramAddress from "../utils/findProgramAddress";
import { SystemProgram } from "@solana/web3.js";

const createRecord = async (courtName) => {
  let program = useProgram();

  try {
    let court = findProgramAddress("court", courtName).publicKey;

    await program.methods
      .initializeRecord(courtName)
      .accounts({
        record: findProgramAddress("record", [
          court,
          program.provider.publicKey,
        ]).publicKey,
        court: court,
        payer: program.provider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    throw err;
  }
};

export default createRecord;
