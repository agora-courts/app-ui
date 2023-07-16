import { AnchorProvider, Program } from "@coral-xyz/anchor";
import idl from "@data/agora_court.json";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

const useProgram = () => {
  const COMMITMENT = "processed";
  const {connection} = useConnection();
  const wallet = useAnchorWallet();

  // if (!wallet || !wallet.publicKey) throw new WalletNotConnectedError();

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: COMMITMENT,
  });

  return new Program(idl, new PublicKey(idl.metadata.address), provider);
};

export default useProgram;