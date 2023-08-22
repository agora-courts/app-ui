import { Text, Box, Center, Flex, Spacer, Button } from "@chakra-ui/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import useProgram from "@hooks/useProgram";
import revealVote from "@services/revealVote";
import getUser from "@services/getUser";
import getCourt from "../../../services/getCourt";
import getError from "@utils/getError";

export function RevealCard({ txnParams, voters, deadline }) {
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
          (ele) => ele.court.name === txnParams.courtName
        );

        let court = await getCourt(txnParams.courtName);
        let disputeAcc = court.disputes[txnParams.disputeID.toNumber()];

        let dispute = juryDispute.disputes.find((ele) => ele.id === disputeAcc._id.toString());
        let vote = dispute.hashedVote;
        let salt = dispute.salt;

        await revealVote({ ...txnParams, vote, salt }, program);
        toast.success("Vote finalized!");
      } catch (error) {
        toast.error(getError(error.message));
      }
    })();
  };

  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
       <Flex mb={3}>
        <Text fontSize="lg" fontWeight="semibold">
          Finalize Your Vote
        </Text>

        <Spacer />
        <Center py={1} px={2} bg="gray.200" rounded="md">
          <Box w="4" mr={1.5}>
            <ClockIcon />
          </Box>
          {deadline}
        </Center>
      </Flex>
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
