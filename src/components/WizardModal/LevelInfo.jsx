import { useState } from "react";
import {
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Flex,
  Spacer,
  Text,
  Card,
  CardBody,
  SimpleGrid
} from "@chakra-ui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

function LevelInfo({ levels, setLevels, ticker }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  let prevLevel = levels[levels.length - 1];

  const handleChange = (event) => {
    setInput(event.target.value);

    let isInvalid =
      isNaN(event.target.value) || parseInt(event.target.value) <= prevLevel;
    setError(isInvalid);
  };

  return (
    <>
      Lastly, set the number of reputation tokens a voter needs to reach each
      level. Levels are used to determine voter eligibility in disputes.
      <SimpleGrid columns={2} gap={3} my={5}>
        {prevLevel > -1 &&
          levels.slice(1).map((level, idx) => (
            <Card size="sm" key={level}>
              <CardBody>
                <Flex align="center">
                  <Text>Level {idx + 1}</Text>
                  <Spacer />
                  <Text>
                    {level} {ticker}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          ))}
        <Card size="sm">
          <CardBody>
            <Flex align="center" gap={3}>
              <Text>Level {levels.length}</Text>
              <Spacer />
              <FormControl isInvalid={error} w="25%">
                <Input
                  size="sm"
                  value={input}
                  placeholder={prevLevel + 1}
                  onChange={handleChange}
                />
                <FormErrorMessage>
                  {error && `Must be at least ${prevLevel + 1}`}
                </FormErrorMessage>
              </FormControl>
              <Box
                bg="green.300"
                rounded="full"
                cursor="pointer"
                w={7}
                p={1}
                color="white"
                onClick={() => {
                  if (!error && input) {
                    setInput("");
                    setLevels((levels) => [...levels, parseInt(input)]);
                  }
                }}
              >
                <CheckIcon />
              </Box>
              <Box
                bg="red.300"
                rounded="full"
                cursor="pointer"
                w={7}
                p={1}
                color="white"
                onClick={() => setLevels((levels) => levels.slice(0, -1))}
              >
                <XMarkIcon />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  );
}

export default LevelInfo;
