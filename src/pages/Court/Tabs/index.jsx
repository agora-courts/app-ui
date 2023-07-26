import {
  Tabs as CTabs,
  TabList,
  Tab as ChakraTab,
  TabPanels,
} from "@chakra-ui/react";
import { DisputeTab } from "./DisputeTab";
import { AboutTab } from "./AboutTab";

const Tabs = ({ court }) => {
  let config = court.config || {};

  return (
    <CTabs>
      <TabList>
        <ChakraTab>Disputes</ChakraTab>
        <ChakraTab>About</ChakraTab>
      </TabList>

      <TabPanels>
        <DisputeTab
          disputes={court.disputes || []}
          tokens={{
            reputationTicker: config.reputationToken?.ticker,
            reputationMint: config.reputationToken?.mintAddress,
            paymentTicker: config.paymentToken?.ticker,
          }}
          testConfig={{
            courtName: court.name,
            payMint: config.paymentToken?.mintAddress,
          }}
        />
        <AboutTab config={config} />
      </TabPanels>
    </CTabs>
  );
};

export default Tabs;
