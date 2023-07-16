import {
  LinkBox,
  LinkOverlay,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = ({logo, name}) => {
  return (
    <LinkBox h={52} borderWidth='1px' rounded='md'>
        <VStack mt={10}>
          <Image boxSize='35%' maxW="90" borderRadius='full' src={logo}/>
          <LinkOverlay fontWeight="bold" fontSize="lg" as={Link} to={`/courts/${name}`}>{name}</LinkOverlay>
        </VStack>
    </LinkBox>
  );
};

export default Card;
