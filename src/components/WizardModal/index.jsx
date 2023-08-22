import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import CourtInfo from "./CourtInfo";
import ProjectInfo from "./ProjectInfo";
import LevelInfo from "./LevelInfo";
import createCourt from "@services/createCourt";
import updateCourt from "@services/updateCourt";
import { toast } from "react-toastify";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import useProgram from "@hooks/useProgram";
import getError from "@utils/getError";

function Wizard({ buttonText, courtName, isDisabled, loadCourt }) {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [levels, setLevels] = useState([-1]); // sentinel value as lower bound for token amounts
  const { isOpen, onOpen, onClose } = useDisclosure();

  const wallet = useAnchorWallet();
  const program = useProgram();

  const isCourtExisting = !!courtName;
  const formTitles = [
    "Welcome to Agora!",
    "Submit Project Details",
    "Configure Level System",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <CourtInfo
          name={courtName}
          setPage={setPage}
          setFormData={setFormData}
        />
      );
    } else if (page === 1) {
      return <ProjectInfo setPage={setPage} setFormData={setFormData} />;
    } else {
      return (
        <LevelInfo
          levels={levels}
          setLevels={setLevels}
          ticker={formData.reputationTicker}
        />
      );
    }
  };

  const handleSubmit = () => {
    if (!isCourtExisting && levels.length == 1) {
      toast.error("Must set at least one level!");
      return;
    }

    let slicedLevels = levels.slice(1);
    (async function () {
      try {
        if (isCourtExisting)
          await updateCourt(courtName, { ...formData, levels: slicedLevels });
        else {
          await createCourt(
            {
              ...formData,
              levels: slicedLevels,
              editAuthority: wallet.publicKey.toString(),
            },
            program
          );
          loadCourt();
        }
        toast.success("Court created!");
      } catch (error) {
        toast.error(getError(error.message));
      }
    })();
  };

  return (
    <>
      <Button onClick={onOpen} isDisabled={!wallet || isDisabled} px={30}>
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">{formTitles[page]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{PageDisplay()}</ModalBody>
          {page === formTitles.length - 1 && (
            <ModalFooter>
              <Button
                variant="outline"
                onClick={() => setPage((currPage) => currPage - 1)}
                mr={4}
              >
                Previous
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Wizard;
