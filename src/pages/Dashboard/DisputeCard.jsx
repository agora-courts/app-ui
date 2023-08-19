import React from "react";
import {
  Text,
  Box,
  Flex,
  Circle,
  LinkBox,
  LinkOverlay,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import getStatusColor from "@utils/getStatusColor";
import getDisputeStatus from "@utils/getDisputeStatus";
import getTimeUntilDate from "@utils/getTimeUntilDate";

function DisputeCard({ title, details, link }) {
  let status = getDisputeStatus(details.timestamps, details.status);
  let color = getStatusColor(status);

  return (
    <LinkBox>
      <Grid
        templateColumns="repeat(4, 1fr)"
        borderBottom="1px"
        borderColor="gray.200"
        py={6}
      >
        <GridItem w="100%">
          <LinkOverlay as={Link} to={link}>
            <Box>
              <Text fontWeight="semibold" align="left">
                {title}
              </Text>
              <Text fontSize="sm" color="gray.400" align="left">
                {details.courtName}
              </Text>
            </Box>
          </LinkOverlay>
        </GridItem>
        <GridItem w="100%">
          <Flex gap={1.5} align="center" h="100%">
            <Circle w={3} h={3} background={color} />
            <Text fontSize={["sm", null, "md"]} fontWeight="semibold">
              {status}
            </Text>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex gap={1.5} align="center" h="100%">
            <Box w="4" display={["none", null, "initial"]}>
              <ClockIcon />
            </Box>
            <Text fontSize={["sm", null, "md"]}>
              {getTimeUntilDate(details.timestamps, status)}
            </Text>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Text fontWeight="semibold" fontSize={["sm", null, "md"]} mt={2.5}>
            {details.role} Member
          </Text>
        </GridItem>
      </Grid>
    </LinkBox>
  );
}

export default DisputeCard;
