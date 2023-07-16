import { Text, Box, Button } from "@chakra-ui/react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

export function RevealCard({ voters }) {
  const wallet = useAnchorWallet();
  const isVoter = voters.some(
    (voter) => voter === wallet?.publicKey.toString()
  );

  const handleSubmit = () => {
    (async function () {
      try {
        // reveal logic
        toast.success("Vote finalized!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  };

  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
      <Text fontSize="lg" fontWeight="semibold">
        Finalize Your Vote
      </Text>
      Reveal your encrypted vote to finalize your submission. Unrevealed votes
      are voided and ineligible for voting rewards.
      <Button
        onClick={handleSubmit}
        variant="outline"
        w="full"
        mt={6}
        isDisabled={!isVoter}
      >
        Reveal Vote
      </Button>
    </Box>
  );
}
