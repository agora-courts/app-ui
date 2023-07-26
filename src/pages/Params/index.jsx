import {
  Card,
  CardHeader,
  CardBody,
  HStack,
  Heading,
  Text,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import WizardModal from "@components/WizardModal";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Params = () => {
  let { state } = useLocation();
  const wallet = useAnchorWallet();
  const config = state.config || {};

  return (
    <Card>
      <CardBody>
        <Stack spacing="5">
          <Heading>{state.name} Parameters</Heading>
          <HStack spacing="5" align="start">
            <Card w="50%">
              <CardHeader>
                <Heading size="md">Addresses</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Reputation Token
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {config.reputationToken?.mintAddress}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Payment Token
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {config.paymentToken?.mintAddress}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Project Contract
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {config.projectAddress}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>

            <Card w="50%">
              <CardHeader>
                <Heading size="md">Configuration</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Max Active Disputes
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {config.maxDisputes} disputes
                    </Text>
                  </Box>
                  <WizardModal
                    buttonText="Edit Config"
                    courtName={state.name}
                    isDisabled={
                      wallet?.publicKey.toString() !== config.editAuthority
                    }
                  />
                </Stack>
              </CardBody>
            </Card>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Params;
