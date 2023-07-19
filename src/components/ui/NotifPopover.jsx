import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Circle,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { BellIcon } from "@heroicons/react/24/outline";

function NotifPopover() {
  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <Circle size="40px" bg="gray.100" p="3" cursor="pointer">
          <BellIcon />
        </Circle>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold" fontSize="xl">
          Court Notifications
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box bg="gray.200" p={5}>
            <Text fontWeight="semibold" fontSize="lg">
              Dialect
            </Text>
            <Text fontSize="sm" mb={3}>
              Get notified when urgent actions are required and when your
              disputes are updated. By wallet, email, Telegram, or text message.
            </Text>
            <Button colorScheme="blackAlpha" size="sm" isDisabled>
              Use Dialect
            </Button>
          </Box>
          <Box bg="gray.200" p={5} mt={3}>
            <Text fontWeight="semibold" fontSize="lg">
              notifi
            </Text>
            <Text fontSize="sm" mb={3}>
              Get notified for actions and dispute updates. By email, Telegram,
              or phone number.
            </Text>
            <Button colorScheme="blackAlpha" size="sm" isDisabled>
              Use Notifi
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default NotifPopover;
