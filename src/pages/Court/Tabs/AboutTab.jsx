import { TabPanel, Text } from "@chakra-ui/react";

export function AboutTab({ config }) {
  return (
    <TabPanel>
      <Text fontSize="small" mt={3}>
        Reputation Token
      </Text>
      <Text>{config.reputationToken?.ticker}</Text>
      <Text fontSize="small" mt={3}>
        Payment Token
      </Text>
      <Text>{config.paymentToken?.ticker}</Text>
      <Text fontSize="small" mt={3}>
        Website
      </Text>
      <Text>{config.website}</Text>
      <Text fontSize="small" mt={3}>
        Twitter
      </Text>
      <Text>{config.twitter}</Text>
    </TabPanel>
  );
}
