import { TabPanel, Select, HStack, Text, VStack } from "@chakra-ui/react";
import DisputeCard from "./DisputeCard";
import { Input } from "@components/ui/Input";

export function DisputeTab({ disputes, repToken, payToken }) {
  return (
    <TabPanel>
      <HStack>
        <Input placeholder="Search for disputes..." />
        <Select placeholder="Filter" w={32}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Sorting" w={40}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </HStack>
      <Text my={4}>{disputes?.length} Disputes</Text>
      <VStack>
        {disputes &&
          disputes.map((dispute, idx) => (
            <DisputeCard
              key={idx}
              dispute={{ ...dispute, repToken, payToken }}
              idx={idx}
            ></DisputeCard>
          ))}
      </VStack>
    </TabPanel>
  );
}
