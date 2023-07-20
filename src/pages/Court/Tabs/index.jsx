import {
  Tabs as CTabs,
  TabList,
  Tab as ChakraTab,
  TabPanels,
} from "@chakra-ui/react";
import { DisputeTab } from "./DisputeTab";
import { AboutTab } from "./AboutTab";

const Tabs = ({ court }) => {
  return (
    <CTabs>
      <TabList>
        <ChakraTab>Disputes</ChakraTab>
        <ChakraTab>About</ChakraTab>
      </TabList>

      <TabPanels>
        <DisputeTab
          disputes={court.disputes}
          repToken={court.config?.reputationToken?.ticker}
          repMint={court.config?.reputationToken?.mintAddress}
          payToken={court.config?.paymentToken?.ticker}
          testConfig={{
            courtName: court.name,
            payMint: court.config?.paymentToken?.mintAddress,
          }}
        />
        <AboutTab config={court.config} />
      </TabPanels>
    </CTabs>
  );
};

export default Tabs;
