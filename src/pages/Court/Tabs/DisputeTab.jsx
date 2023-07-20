import {
  TabPanel,
  Select,
  HStack,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import DisputeCard from "./DisputeCard";
import { Input } from "@components/ui/Input";
import { useState } from "react";
import createDispute from "@services/createDispute";
import useProgram from "@hooks/useProgram";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

export function DisputeTab({
  disputes,
  repToken,
  payToken,
  repMint,
  testConfig,
}) {
  const [query, setQuery] = useState();
  const [filterBy, setFilter] = useState();
  const [sort, setSort] = useState();
  const program = useProgram();

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

  const handleClick = () => {
    (async function () {
      try {
        await createDispute(
          {
            courtName: testConfig.courtName,
            repMint: new PublicKey(repMint),
            payMint: new PublicKey(testConfig.payMint),
          },
          program
        );
        toast.success("Test dispute created!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  };

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
      <Button mb={4} onClick={handleClick} isDisabled={!program}>
        Create Test Dispute
      </Button>
      <VStack>
        {filteredDisputes.map((dispute, idx) => (
          <DisputeCard
            key={idx}
            dispute={{
              ...dispute,
              repToken,
              payToken,
              repMint,
              payMint: testConfig.payMint,
            }}
            idx={idx}
          ></DisputeCard>
        ))}
      </VStack>
    </TabPanel>
  );
}
