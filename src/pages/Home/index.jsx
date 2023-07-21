import { Flex, Text, Spacer, SimpleGrid } from "@chakra-ui/react";
import Card from "./Card";
import { Input } from "@components/ui/Input";
import { useState, useEffect } from "react";
import getCourts from "@services/getCourts";
import WizardModal from "@components/WizardModal";

const Home = () => {
  const [courts, setCourts] = useState([]);
  const [query, setQuery] = useState();

  async function loadCourt() {
    let active = true;

    (async function () {
      const res = await getCourts();
      if (!active) {
        return;
      }
      setCourts(res);
    })();

    return () => {
      active = false;
    };
  }

  useEffect(() => {
    loadCourt();
  }, []);

  const filter = (courts) => {
    if (!query) return courts;

    return courts.filter((court) => court.name.toLowerCase().startsWith(query));
  };

  return (
    <>
      <Flex wrap="wrap">
        <Text fontSize="2xl" fontWeight="bold">
          Courts
        </Text>

        <Spacer />

        <Flex gap={5}>
          <Input
            setQuery={setQuery}
            width={52}
            placeholder="Search for courts..."
          />
          <WizardModal btnText="Create Court" loadCourt={loadCourt} />
        </Flex>
      </Flex>

      <SimpleGrid columns={[2, null, 3, 5]} spacing="14px" mt={5}>
        {filter(courts).map((court) => (
          <Card key={court.name} logo={court.config.logo} name={court.name} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
