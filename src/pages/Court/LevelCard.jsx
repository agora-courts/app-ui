import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
  Spacer,
  Box,
  Progress,
  Flex,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import getLevel from "@utils/getLevel.js";
import getTokenBalance from "@services/getTokenBalance";
import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const InfoPopover = ({ levels, ticker }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box w="5" cursor="pointer">
          <InformationCircleIcon />
        </Box>
      </PopoverTrigger>
      <PopoverContent w="160px">
        <PopoverArrow />
        <PopoverBody>
          <Stack divider={<StackDivider />} fontSize="xs">
            {levels.map((level, idx) => (
              <Flex key={level}>
                <Text fontWeight="semibold">Level {idx + 1}</Text>
                <Spacer />
                <Text>
                  {level} {ticker}
                </Text>
              </Flex>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export function LevelCard({ config }) {
  const [tokenBalance, setTokenBalance] = useState(0);
  const wallet = useAnchorWallet();

  const ticker = config.reputationToken?.ticker;
  const levels = config.levels || [];
  const levelIdx = getLevel(tokenBalance, levels);

  useEffect(() => {
    if (!config.reputationToken || !wallet) return;

    let active = true;
    loadTokenBalance();
    return () => {
      active = false;
    };

    async function loadTokenBalance() {
      const balance = await getTokenBalance(
        config.reputationToken.mintAddress,
        wallet.publicKey
      );
      if (!active) {
        return;
      }
      setTokenBalance(balance);
    }
  }, [config, wallet]);

  return (
    <Box
      borderWidth="1px"
      rounded="md"
      h="min"
      w={["full", null, null, "32%"]}
      p={[4, null, 6]}
    >
      <Flex>
        <Text fontSize="xl" fontWeight="bold">
          My Voting Level
        </Text>
        <Spacer />
        <InfoPopover levels={levels} ticker={ticker} />
      </Flex>
      <Text mt={5} fontSize="sm">
        {tokenBalance} {ticker}
      </Text>
      <Progress
        value={
          levelIdx < levels.length - 1
            ? ((tokenBalance - levels[levelIdx]) /
                (levels[levelIdx + 1] - levels[levelIdx])) *
              100
            : 100
        }
        rounded="md"
        my={1}
        colorScheme="green"
      />
      <Flex>
        <Text color="green.500" fontSize="lg">
          LEVEL {levelIdx + 1}
        </Text>
        <Spacer />
        {levelIdx < levels.length - 1 && (
          <>
            {levels[levelIdx + 1] - tokenBalance} {ticker} to
            <Text color="green.500">&nbsp;Level {levelIdx + 2}</Text>
          </>
        )}
      </Flex>
    </Box>
  );
}
