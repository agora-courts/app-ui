import { useState, useEffect } from "react";
import TokenCard from "./TokenCard";
import DisputeCard from "./DisputeCard";
import { Flex, Spacer, Heading, Button, Text } from "@chakra-ui/react";
import useProgram from "@hooks/useProgram";
import getUser from "@services/getUser";
import getAsset from "@services/getAsset";
import { DEFAULT_IMG } from "@data/constants.js";
import { toast } from "react-toastify";
import getTimeUntilDate from "@utils/getTimeUntilDate";
import claimDisputes from "@services/claimDisputes";

function Dashboard() {
  const [user, setUser] = useState({});
  const [unauthorized, setUnauthorized] = useState(false);
  const program = useProgram();

  useEffect(() => {
    if (!program) return;

    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      try {
        let user = await getUser();
        if (user.tokenBalances.length == 0) return;

        let token_metadata = await getAsset(
          user.tokenBalances.map((token) => token.mint)
        );
        user.tokenBalances.forEach((token, idx, arr) => {
          arr[idx] = { ...token_metadata[idx], amount: token.amount };
        });
      } catch (e) {
        console.log(e);
        if (e.response.data === "Not Authorized") {
          setUnauthorized(true);
        }
      }
      if (!active) {
        return;
      }
      setUser(user);
    }
  }, [program]);

  const handleSubmit = () => {
    (async function () {
      try {
        
        await claimDisputes({}, program)
        toast.success("Balances claimed!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  };

  return (
    <div>
      <Flex mb={10}>
        <Heading>My Disputes</Heading>
        <Spacer />
        {user.tokenBalances?.length > 0 && (
          <Button variant="outline" onClick={handleSubmit}>
            Claim All
          </Button>
        )}
      </Flex>
      <Flex gap={4}>
        {user.tokenBalances?.map((token) => (
          <TokenCard
            logo={token.logo || DEFAULT_IMG}
            ticker={token.ticker}
            balance={token.amount}
          />
        ))}
      </Flex>
      {user.partyDisputes?.map((ele) =>
        ele.court.disputes?.reduce((res, dispute, idx) => {
          if (ele.disputeIDs.includes(dispute._id)) {
            res.push(
              <DisputeCard
                title={dispute.title}
                court={ele.court.name}
                status={dispute.status}
                timestamp={getTimeUntilDate(dispute.timestamps, dispute.status)}
                role="Party"
                link={`/courts/${ele.court.name}/dispute/${idx}`}
              />
            );
          }
          return res;
        }, [])
      )}
      {user.juryDisputes?.map((ele) =>
        ele.court.disputes?.reduce((res, dispute, idx) => {
          if (ele.disputes.map((d) => d.id).includes(dispute._id)) {
            res.push(
              <DisputeCard
                title={dispute.title}
                court={ele.court.name}
                status={dispute.status}
                timestamp={getTimeUntilDate(dispute.timestamps, dispute.status)}
                role="Party"
                link={`/courts/${ele.court.name}/dispute/${idx}`}
              />
            );
          }
          return res;
        }, [])
      )}
      {unauthorized && (
        <>
          <Text fontSize="xl" fontWeight="semibold" textAlign="center">
            Hold Up!
          </Text>
          <Text textAlign="center">
            Connect and sign in with your Solana wallet to view your dashboard.
          </Text>
        </>
      )}
    </div>
  );
}

export default Dashboard;
