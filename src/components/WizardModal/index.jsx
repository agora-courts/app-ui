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

function Wizard({ btnText, name, isDisabled }) {
  const [page, setPage] = useState(0);
  const [info, setInfo] = useState({});
  const [levels, setLevels] = useState([-1]);
  const wallet = useAnchorWallet();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const FormTitles = [
    "Welcome to Agora!",
    "Submit Project Details",
    "Configure Level System",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <CourtInfo name={name} setPage={setPage} setInfo={setInfo} />;
    } else if (page === 1) {
      return <ProjectInfo setPage={setPage} setInfo={setInfo} />;
    } else {
      return (
        <LevelInfo
          levels={levels}
          setLevels={setLevels}
          ticker={info.reputationTicker}
        />
      );
    }
  };

  const handleSubmit = () => {
    if (!name && levels.length == 1) {
      toast.error("Must set at least one level!");
      return;
    }

    let sliced = levels.slice(1);
    (async function () {
      try {
        if (name) await updateCourt(name, { ...info, levels: sliced });
        else
          await createCourt({
            ...info,
            levels: sliced,
            editAuthority: wallet.publicKey.toString(),
          });
        toast.success("Court created!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  };

  return (
    <>
      <Button onClick={onOpen} isDisabled={!wallet || isDisabled} px={30}>
        {btnText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">{FormTitles[page]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{PageDisplay()}</ModalBody>
          {page === FormTitles.length - 1 && (
            <ModalFooter>
              <Button onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Wizard;
