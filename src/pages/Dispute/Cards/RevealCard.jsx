import { Text, Box, Button } from "@chakra-ui/react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import useProgram from "@hooks/useProgram";
import revealVote from "@services/revealVote";
import getUser from "@services/getUser";

export function RevealCard({ txnParams, voters }) {
  const wallet = useAnchorWallet();
  const program = useProgram();

  const isVoter = voters.some(
    (voter) => voter === wallet?.publicKey.toString()
  );

  const handleSubmit = () => {
    (async function () {
      try {
        let user = await getUser();
        let juryDispute = user.juryDisputes.find(
          (ele) => ele.court.name === courtName
        );
        let vote = juryDispute.disputes.find(
          (ele) => ele.id === disputeID
        ).hashedVote;

        await revealVote({ ...txnParams, vote }, program);
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
