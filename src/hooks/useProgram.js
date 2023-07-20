import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "@data/agora_court.json";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";

const useProgram = () => {
  const COMMITMENT = "processed";
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  if (!wallet) return undefined;

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: COMMITMENT,
  });

  anchor.setProvider(provider);

  return new Program(idl, new PublicKey(idl.metadata.address), provider);
};

export default useProgram;
