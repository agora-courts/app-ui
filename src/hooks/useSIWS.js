import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { SigninMessage } from "@utils/SigninMessage";
import bs58 from "bs58";
import login from "@services/login";

const useSIWS = () => {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.signMessage) return;

    (async function () {
      try {
        await login("", "");
      } catch (e) {
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
      }
    })();
  }, [wallet.connected]);
};

export default useSIWS;
