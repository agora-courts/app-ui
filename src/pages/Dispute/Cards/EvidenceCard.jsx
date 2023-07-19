import { Text, Box, Button } from "@chakra-ui/react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRef } from "react";

export function EvidenceCard({ cases }) {
  const wallet = useAnchorWallet();
  const isParty = cases.some(
    (c) => c.partyAddress === wallet?.publicKey.toString()
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const evidence = useRef(null);

  const handleSubmit = () => {
    (async function () {
      try {
        if (!evidence.current.value) return;
        // evidence submit logic
        toast.success("Evidence submitted!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  };

  return (
    <Box borderWidth="1px" rounded="md" p={[4, null, 6]}>
      <Text fontSize="lg" fontWeight="semibold">
        Submissions Open
      </Text>
      Provide relevant evidence such as texts, photos, and videos to present to
      the jury and escalate this dispute to the voting stage.
      <Button
        onClick={onOpen}
        variant="outline"
        w="full"
        mt={6}
        isDisabled={!isParty}
      >
        Submit Evidence
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Evidence</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              ref={evidence}
              placeholder="Provide a detailed description here..."
              rows={8}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}