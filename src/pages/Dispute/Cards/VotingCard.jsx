import { Text, Box, Center, Flex, Spacer, Button } from "@chakra-ui/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import castVote from "@services/castVote";
import useProgram from "@hooks/useProgram";
import { PublicKey } from "@solana/web3.js";
import getError from "@utils/getError";

export function VotingCard({ txnParams, deadline, cases, loadDispute }) {
  const program = useProgram();

  const handleSubmit = (partyIdx) => {
    (async function () {
      try {
        let candidateAcc = cases[partyIdx].partyAddress;
        await castVote(
          {
            ...txnParams,
            candidateAcc: new PublicKey(candidateAcc),
          },
          program
        );
        setTimeout(loadDispute(), 2500);
        toast.success("Vote submitted!");
      } catch (error) {
        toast.error(getError(error.message));
      }
    })();
  };

  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
      <Flex mb={3}>
        <Text fontSize="lg" fontWeight="semibold">
          Voting Open
        </Text>

        <Spacer />
        <Center py={1} px={2} bg="gray.200" rounded="md">
          <Box w="4" mr={1.5}>
            <ClockIcon />
          </Box>
          {deadline}
        </Center>
      </Flex>
      {cases?.map((_, idx) => (
        <Button
          key={idx}
          onClick={() => handleSubmit(idx)}
          variant="outline"
          w="full"
          my={2}
          isDisabled={!program}
        >
          Party {idx + 1}
        </Button>
      ))}
    </Box>
  );
}
