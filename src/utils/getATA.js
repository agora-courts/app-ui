import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";

const getATA = (mint, owner, isPDA = true) => {
    return getAssociatedTokenAddressSync(
        mint,
        owner,
        isPDA,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
}

export default getATA;