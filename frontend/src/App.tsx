import { useEffect, useState } from "react";
import "./App.css";

//POLKADOT API
import { ApiPromise, WsProvider } from "@polkadot/api";
import Home from "./components/pages/Home";
import { Flex } from "@chakra-ui/react";

function App() {
  const [api, setApi] = useState<any>(null);

  const setupApi = async () => {
    //POLKADOT ASSETS HUB RPC FOR NON LOCAL DEVELOPMENT UNTIL WE HAVE OUR OWN NODE
    const wsProvider = new WsProvider(
      "wss://polkadot-asset-hub-rpc.polkadot.io"
    );
    //USE THIS FOR LOCAL DEVELOPMENT WITH THE NODE RUNNING
    // const wsProvider = new WsProvider("ws://127.0.0.1:9944");
    const api = await ApiPromise.create({ provider: wsProvider });
    setApi(api);

    // Get the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    console.log(
      `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
    );
  };

  useEffect(() => {
    setupApi();
  }, []);

  useEffect(() => {
    if (api) {
      console.log("PolkAttest is connected");
      console.log(api);

      const getBlock = async () => {
        const block = await api.query.timestamp.now();
        console.log("Block:", block.toPrimitive());
      };

      getBlock();
    }
  }, [api]);

  return (
    <Flex w="100%" h="100%">
      <Home />
    </Flex>
  );
}

export default App;
