import {
  LinkBox,
  LinkOverlay,
  Text,
  Flex,
  Spacer,
  Box,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import relativeTime from "@utils/relativeTime";
import getStatusColor from "@utils/getStatusColor";

const DisputeCard = ({ dispute, idx }) => {
  let color = getStatusColor((dispute.status));

  return (
    <LinkBox
      p="5"
      borderWidth="1px"
      rounded="md"
      w="100%"
      _hover={{ bg: "gray.100" }}
    >
      <Flex>
        <LinkOverlay
          fontWeight="bold"
          fontSize="xl"
          as={Link}
          to={`dispute/${idx}`}
          state={dispute}
        >
          {dispute.title}
          <Badge ml={2}>Level {dispute.levelRequired}</Badge>
        </LinkOverlay>
        <Spacer />
        <Text color={color}>{dispute.status}</Text>
        <Box w="5" ml={3}>
          <ChevronRightIcon />
        </Box>
      </Flex>
      Submitted {relativeTime(dispute.timestamps.startTime)}
    </LinkBox>
  );
};

export default DisputeCard;
