import {
  Flex,
  Image,
  Text,
  Spacer,
  Link,
  Circle,
  HStack,
  Box,
  Show,
} from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  ArrowTopRightOnSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link as routerLink } from "react-router-dom";
import logo from "@assets/logo.png";
import NotifPopover from "./ui/NotifPopover";
import useSIWS from "@hooks/useSIWS";

const Header = () => {
  useSIWS(); // header is rendered on all pages, SIWS will be triggered anywhere header is rendered

  return (
    <Flex my={3} h={[16, 24]} align="center">
      <Link as={routerLink} to="/" style={{ textDecoration: "none" }}>
        <Flex h={12} align="center">
          <Image src={logo} alt="Logo" height="full" />
          <Text fontSize="xl" fontWeight="semibold" pl={2} hideBelow="md">
            Agora
          </Text>
        </Flex>
      </Link>

      <Spacer />

      <HStack spacing={["12px", "24px"]}>
        <Show above="sm">
          <Link href="https://chakra-ui.com" isExternal hideBelow="md">
            <HStack>
              <Text>Read the Docs</Text>{" "}
              <Box w="4">
                <ArrowTopRightOnSquareIcon />
              </Box>
            </HStack>
          </Link>
        </Show>

        <NotifPopover />
        <Link as={routerLink} to="/dashboard">
          <Circle size="40px" bg="gray.100" p="3" cursor="pointer">
            <UserIcon />
          </Circle>
        </Link>
        <WalletMultiButton />
      </HStack>
    </Flex>
  );
};

export default Header;
