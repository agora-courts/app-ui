import {
  Heading,
  Text,
  Box,
  Flex,
  Spacer,
  Circle,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  Accordion,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { VotingCard } from "./Cards/VotingCard";
import { DetailsCard } from "./Cards/DetailsCard";
import { EvidenceCard } from "./Cards/EvidenceCard";
import { RevealCard } from "./Cards/RevealCard";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getTimeUntilDate from "@utils/getTimeUntilDate";
import getCourt from "@services/getCourt";
import getStatusColor from "@utils/getStatusColor";

const Dispute = () => {
  let { state } = useLocation();
  let { name, disputeId } = useParams();
  const [dispute, setDispute] = useState();
  let color = getStatusColor(dispute?.status);

  useEffect(() => {
    if (state) {
      setDispute(state);
      return;
    }
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const court = await getCourt(name);

      if (!active || court.disputes.length <= disputeId) {
        return;
      }
      setDispute({
        ...court.disputes[disputeId],
        repToken: court.config.reputationToken.ticker,
        repMint: court.config.reputationToken.mintAddress,
        payToken: court.config.paymentToken.ticker,
      });
    }
  }, []);

  const CardDisplay = () => {
    switch (dispute?.status) {
      case "Inactive":
      case "Awaiting Evidence":
        return <EvidenceCard cases={dispute?.cases} />;
      case "Voting":
        return (
          <VotingCard
            courtName={name}
            disputeID={disputeId}
            repMint={dispute?.repMint}
            cases={dispute?.cases}
            deadline={getTimeUntilDate(dispute?.timestamps, dispute?.status)}
          />
        );
      case "Finalizing Votes":
        return <RevealCard voters={dispute?.voters} />;
    }
  };

  return (
    <Flex gap={4} wrap="wrap-reverse" align="start">
      <Box
        borderWidth="1px"
        rounded="md"
        w={["full", null, null, "65%"]}
        p={[2, null, 8]}
        pt={[10]}
      >
        <Flex align="center">
          <Heading>{dispute?.title}</Heading>
          <Spacer />
          <Button mr={5}>Join Dispute</Button>
          <Circle borderWidth={1} py={0.5} px={2} borderColor={color}>
            <Text color={color}>{dispute?.status}</Text>
          </Circle>
        </Flex>
        <Text my={5}>{dispute?.protocolDescription}</Text>
        <Accordion defaultIndex={[0]} allowMultiple>
          {dispute &&
            dispute.cases.map((c, idx) => (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="xl">
                      Party {idx + 1} Evidence
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text py={2} fontWeight="semibold">
                    Author: {c.partyAddress}
                  </Text>
                  {c.evidence}
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </Box>

      <Flex w={["full", null, null, "33%"]} flexDir="column" gap={4}>
        {CardDisplay()}
        <DetailsCard dispute={dispute} />
      </Flex>
    </Flex>
  );
};

export default Dispute;
