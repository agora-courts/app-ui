import {
  InputGroup,
  InputLeftElement,
  Input as CInput
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Input({setQuery, placeholder, width}) {
  return (
    <InputGroup w={width}>
      <InputLeftElement pointerEvents="none" w="5" color="gray.300" ml={3}>
        <MagnifyingGlassIcon />
      </InputLeftElement>
      <CInput placeholder={placeholder} onChange={(e) => setQuery(e.target.value)}/>
    </InputGroup>
  );
}
