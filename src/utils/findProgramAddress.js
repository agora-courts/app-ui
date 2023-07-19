import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

const findProgramAddress = (label, programId, extraSeeds = null) => {
    let seeds = [Buffer.from(anchor.utils.bytes.utf8.encode(label))];
    if (extraSeeds) {
        for (let extraSeed of extraSeeds) {
            if (typeof extraSeed === "string") {
                seeds.push(Buffer.from(anchor.utils.bytes.utf8.encode(extraSeed)));
            } else if (anchor.BN.isBN(extraSeed)) {
                seeds.push(extraSeed.toArrayLike(Buffer, "be", 8));
            } else if (Array.isArray(extraSeed)) {
                seeds.push(Buffer.from(extraSeed));
            } else {
                seeds.push(extraSeed.toBuffer());
            }
        }
    }
    let [publicKey, bump] = PublicKey.findProgramAddressSync(seeds, programId);
    return { publicKey, bump };
};

export default findProgramAddress;