import { Image, Text, Spacer, Link, HStack, Box, Flex } from "@chakra-ui/react";
import {
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Tabs from "./Tabs";
import { Link as routerLink } from "react-router-dom";
import { LevelCard } from "./LevelCard";
import { useState, useEffect } from "react";
import getCourt from "@services/getCourt";
import { useParams } from "react-router-dom";

const Court = () => {
  const [court, setCourt] = useState({});
  let { name } = useParams();

  useEffect(() => {
    let active = true;
    loadCourt();
    return () => {
      active = false;
    };

    async function loadCourt() {
      const court = await getCourt(name);
      if (!active) {
        return;
      }
      setCourt(court);
    }
  }, []);

  return (
    <Flex gap={6} wrap="wrap-reverse" align="start">
      <Box
        borderWidth="1px"
        rounded="md"
        w={["full", null, null, "65%"]}
        p={[2, null, 8]}
        pt={[10]}
      >
        <Flex gap={4} align="center" justify="center" wrap="wrap">
          <Image borderRadius="full" boxSize="10%" src={court.config?.logo} />
          <Text fontSize="2xl" fontWeight="bold">
            {court.name}
          </Text>
          <Spacer hideBelow="md" />
          <Flex gap={3}>
            <Link style={{ textDecoration: "none" }}>
              <HStack>
                <Box w="6">
                  <UserGroupIcon />
                </Box>
                <Text fontSize="md">Members ({court.members?.length})</Text>
              </HStack>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              as={routerLink}
              to="config"
              state={court}
            >
              <HStack>
                <Box w="6">
                  <Cog6ToothIcon />
                </Box>
                <Text fontSize="md">Params</Text>
              </HStack>
            </Link>
            <Link
              href={`https://explorer.solana.com/address/${court.config?.projectAddress}`}
              isExternal
            >
              <Box w="6">
                <ArrowTopRightOnSquareIcon />
              </Box>
            </Link>
          </Flex>
        </Flex>
        <Image src={court.config?.banner} w="100%" py="10" />
        <Tabs court={court} />
      </Box>

      <LevelCard config={court.config || {}} />
    </Flex>
  );
};

export default Court;
