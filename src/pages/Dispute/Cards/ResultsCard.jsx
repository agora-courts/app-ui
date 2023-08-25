import { Text, Box, Progress, Flex, Stack, Spacer } from "@chakra-ui/react";

export function ResultsCard({ totalVotes, cases }) {
  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
      <Flex mb={3}>
        <Text fontSize="lg" fontWeight="semibold">
          Voting Results
        </Text>
      </Flex>
      <Stack spacing={5}>
        {cases?.map((c, idx) => (
          <Stack spacing={1}>
            <Flex>
              <Text fontSize="sm">Party {idx + 1}</Text>
              <Spacer />
              <Text fontSize="sm">{c.votes} votes</Text>
            </Flex>
            <Progress
              size="lg"
              colorScheme="green"
              value={(c.votes / totalVotes) * 100}
              rounded="md"
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
