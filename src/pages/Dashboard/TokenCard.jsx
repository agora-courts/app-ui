import React from "react";
import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
} from "@chakra-ui/react";

function TokenCard({logo, ticker, balance}) {
  return (
    <Box rounded="xl" bg="gray.100" w="230px" h="170px" p={6}>
      <Flex gap="2.5" align="end">
        <Image
          boxSize="32px"
          objectFit="cover"
          src={logo}
          rounded="full"
        />
        <Text fontSize="xl">{ticker}</Text>
      </Flex>
      <Text mt={5} color="gray.600">
        Balance Changes
      </Text>
      <Heading>{balance}</Heading>
    </Box>
  );
}

export default TokenCard;
