import findProgramAddress from "./findProgramAddress";
import { SystemProgram, Transaction } from "@solana/web3.js";

const createRecordChecked = async (courtName, program) => {
  let tx = new Transaction();

  let courtPDA = findProgramAddress("court", program.programId, courtName).publicKey;

  let recordPDA = findProgramAddress("record", program.programId, [courtPDA, program.provider.publicKey]).publicKey;

  let recordAcc = await program.provider.connection.getAccountInfo(recordPDA);

  if (recordAcc == null) {
    tx.add(
      await program.methods
      .initializeRecord(courtName)
      .accounts({
        record: recordPDA,
        court: courtPDA,
        payer: program.provider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
    )
  }

  return tx;
};

export default createRecordChecked;
