import { TabPanel, Select, HStack, Text, VStack } from "@chakra-ui/react";
import DisputeCard from "./DisputeCard";
import { Input } from "@components/ui/Input";
import { useState } from "react";

export function DisputeTab({ disputes, repToken, payToken }) {
  const [query, setQuery] = useState();
  const [filterBy, setFilter] = useState();
  const [sort, setSort] = useState();

  const filter = (disputes) => {
    let res = disputes;

    if (query) {
      res = res.filter((dispute) =>
        dispute.title.toLowerCase().startsWith(query)
      );
    }

    if (filterBy) {
      res = res.filter((dispute) => dispute.status === filterBy);
    }

    if (sort) {
      if (sort === "Oldest") {
        res = res.slice().reverse();
      } else if (sort === "Level") {
        res = res.slice().sort((a, b) => a.levelRequired - b.levelRequired);
      }
    }

    return res;
  };
  let filteredDisputes = filter(disputes) || [];

  return (
    <TabPanel>
      <HStack>
        <Input placeholder="Search for disputes..." setQuery={setQuery} />
        <Select
          placeholder="Filter"
          w={32}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Inactive">Inactive</option>
          <option value="Awaiting Evidence">Awaiting Evidence</option>
          <option value="Voting">Voting</option>
          <option value="Finalizing Votes">Finalizing Votes</option>
          <option value="Completed">Completed</option>
        </Select>
        <Select
          placeholder="Sort By"
          w={40}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Oldest">Least Recent</option>
          <option value="Level">Level Increasing</option>
        </Select>
      </HStack>
      <Text my={4}>{filteredDisputes?.length} Disputes</Text>
      <VStack>
        {filteredDisputes.map((dispute, idx) => (
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
