import { Text, Box, SimpleGrid, Progress } from "@chakra-ui/react";
import getDurationDays from "@utils/getDurationDays";

export function DetailsCard({ dispute }) {
  let payTokenRewards =
    dispute.cases?.length * dispute.partyDeposit?.paymentTokens;
  let repTokenRewards =
    dispute.cases?.length * dispute.partyDeposit?.reputationTokens +
    dispute.voterDeposit * dispute.totalVotes;

  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
      <Text fontSize="lg" fontWeight="semibold">
        Dispute Details
      </Text>
      <Box bg="gray.200" px={3} py={2} rounded="md" my={4}>
        <Text fontSize="sm">Decision Quorem</Text>
        <Text fontWeight="semibold">
          {dispute.totalVotes}/{dispute.voteQuorem} required votes submitted
        </Text>
        <Progress
          value={(dispute.totalVotes / dispute.voteQuorem) * 100}
          my={2}
          rounded="md"
          colorScheme="gray"
        />
      </Box>
      <SimpleGrid columns={2} spacing={5}>
        <Box>
          <Text fontSize="sm" color="gray.400">
            Level Requirement
          </Text>
          <Text>Level {dispute.levelRequired}</Text>
        </Box>
        <Box>
          <Text fontSize="small" color="gray.400">
            Total Rewards
          </Text>
          <Text>
            {payTokenRewards} {dispute.paymentTicker} / {repTokenRewards}{" "}
            {dispute.reputationTicker}
          </Text>
        </Box>
        <Box>
          <Text fontSize="small" color="gray.400">
            Voter Deposit
          </Text>
          <Text>
            {dispute.voterDeposit} {dispute.reputationTicker}
          </Text>
        </Box>
        <Box>
          <Text fontSize="small" color="gray.400">
            Party Deposit
          </Text>
          <Text>
            {dispute.partyDeposit?.paymentTokens} {dispute.paymentTicker} /{" "}
            {dispute.partyDeposit?.reputationTokens} {dispute.reputationTicker}
          </Text>
        </Box>
        <Box>
          <Text fontSize="small" color="gray.400">
            Total Duration
          </Text>
          <Text>{getDurationDays(dispute.timestamps)}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
