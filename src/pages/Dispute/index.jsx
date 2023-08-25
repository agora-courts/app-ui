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
import { ResultsCard } from "./Cards/ResultsCard";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getTimeUntilDate from "@utils/getTimeUntilDate";
import getCourt from "@services/getCourt";
import getStatusColor from "@utils/getStatusColor";
import useProgram from "@hooks/useProgram";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { toast } from "react-toastify";
import joinDispute from "@services/joinDispute";
import getDisputeStatus from "@utils/getDisputeStatus";
import getError from "@utils/getError";

const Dispute = () => {
  let { state } = useLocation();
  let { name, disputeId } = useParams();
  const [dispute, setDispute] = useState({});
  const program = useProgram();

  let status = getDisputeStatus(dispute.timestamps, dispute.status);
  let color = getStatusColor(status);

  function loadDispute() {
    let active = true;

    (async function () {
      const court = await getCourt(name);

      if (!active || court.disputes.length <= disputeId) {
        return;
      }
      setDispute({
        ...court.disputes[disputeId],
        reputationTicker: court.config.reputationToken.ticker,
        reputationMint: court.config.reputationToken.mintAddress,
        paymentTicker: court.config.paymentToken.ticker,
        payMint: court.config.paymentToken.mintAddress,
      });
    })();

    return () => {
      active = false;
    };
  }

  useEffect(() => {
    if (state) {
      setDispute(state);
    } else {
      loadDispute();
    }
  }, []);

  const CardDisplay = () => {
    switch (status) {
      case "Inactive":
      case "Awaiting Evidence":
        return (
          <EvidenceCard
            txnParams={{ courtName: name, disputeID: new BN(disputeId) }}
            cases={dispute.cases}
            loadDispute={loadDispute}
          />
        );
      case "Voting":
        return (
          <VotingCard
            txnParams={{
              courtName: name,
              disputeID: new BN(disputeId),
              repMint: new PublicKey(dispute.reputationMint),
            }}
            cases={dispute.cases}
            deadline={getTimeUntilDate(dispute.timestamps, status)}
            loadDispute={loadDispute}
          />
        );
      case "Finalizing Votes":
        return (
          <RevealCard
            txnParams={{ courtName: name, disputeID: new BN(disputeId) }}
            voters={dispute.voters}
            deadline={getTimeUntilDate(dispute.timestamps, status)}
          />
        );
      case "Completed":
        return (
          <ResultsCard
            totalVotes={dispute.totalVotes}
            cases={dispute.cases}
          ></ResultsCard>
        );
    }
  };

  const handleClick = () => {
    (async function () {
      try {
        await joinDispute(
          {
            courtName: name,
            disputeID: new BN(disputeId),
            repMint: new PublicKey(dispute.reputationMint),
            payMint: new PublicKey(dispute.payMint),
          },
          program
        );
        setTimeout(loadDispute(), 2500);
        toast.success("Dispute joined!");
      } catch (error) {
        toast.error(getError(error.message));
      }
    })();
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
          <Heading>{dispute.title}</Heading>
          <Spacer />
          {status === "Inactive" && (
            <Button mr={5} onClick={handleClick} isDisabled={!program}>
              Join Dispute
            </Button>
          )}
          <Circle borderWidth={1} py={0.5} px={2} borderColor={color}>
            <Text color={color}>{status}</Text>
          </Circle>
        </Flex>
        <Text my={5}>{dispute.protocolDescription}</Text>
        <Accordion defaultIndex={[0]} allowMultiple>
          {dispute.cases?.map((c, idx) => (
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
