import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { SigninMessage } from "@utils/SigninMessage";
import bs58 from "bs58";
import { login, logout } from "@services/auth";

const signIn = async (wallet, setPublicKey) => {
  const message = new SigninMessage({
    domain: window.location.host,
    publicKey: wallet.publicKey?.toBase58(),
    statement: "Sign in to Agora!",
    nonce: "csrf",
  });

  const data = new TextEncoder().encode(message.prepare());
  const signature = await wallet.signMessage(data);
  const serializedSignature = bs58.encode(signature);

  await login(message, serializedSignature);
  setPublicKey(wallet.publicKey.toString());
};

const useSIWS = () => {
  const wallet = useWallet();
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    if (!wallet.connected || !wallet.signMessage) return;

    (async function () {
      try {
        if (wallet.publicKey.toString() !== publicKey) {
          await logout();
          throw Error("Need to sign in");
        }

        // try to login if session exists
        await login("", "");
      } catch (err) {
        if (err.message == "Need to sign in") {
          await signIn(wallet, setPublicKey);
        } else {
          console.log(err);
        }
      }
    })();
  }, [wallet.publicKey]);
};

export default useSIWS;
