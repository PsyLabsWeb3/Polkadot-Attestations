import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { Signer } from "@polkadot/api/types";
import { SubmittableExtrinsicFunction } from "@polkadot/api/promise/types";

// Types for SchemaData
export type SchemaField = {
  name: string;
  data_type: string;
  value: string;
};

export type SchemaData = {
  name: string;
  fields: SchemaField[];
};

// Define the API context type
interface ApiContextType {
  api: ApiPromise | null;
  sendTransaction: (
    selectedAccount: string,
    transaction: SubmittableExtrinsicFunction,
    params: SchemaData[]
  ) => Promise<void>;
}

// Create the context with default values
const ApiContext = createContext<ApiContextType>({
  api: null,
  sendTransaction: async () => {},
});

// Custom hook to use the API context
export const useApi = () => useContext(ApiContext);

// Provider component to wrap the app and provide the API logic
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, setApi] = useState<ApiPromise | null>(null);

  // Setup the API connection
  useEffect(() => {
    const initializeApi = async () => {
      const wsProvider = new WsProvider("ws://127.0.0.1:9944");
      const apiInstance = await ApiPromise.create({ provider: wsProvider });
      setApi(apiInstance);
    };
    initializeApi();
  }, []);

  // Function to send a transaction and handle responses
  const sendTransaction = async (
    selectedAccount: string,
    transaction: SubmittableExtrinsicFunction,
    params: SchemaData[]
  ): Promise<void> => {
    try {
      const signer = (await web3FromAddress(selectedAccount)).signer as Signer;

      const unsub = await transaction(...params).signAndSend(
        selectedAccount,
        { signer },
        ({ status, events, dispatchError }) => {
          if (status.isInBlock) {
            console.log(
              `Transaction included at blockHash ${status.asInBlock}`
            );

            // Decoding events
            if (events) {
              events.forEach(({ event: { method, section, data }, phase }) => {
                console.log(
                  `Event: ${section}.${method}:: (Phase = ${phase.toString()})`
                );
                console.log(`Data: ${data.toString()}`);
              });
            }

            // Handle transaction errors
            if (dispatchError) {
              if (dispatchError.isModule) {
                const decoded = api?.registry.findMetaError(
                  dispatchError.asModule
                );
                const { name, section } = decoded!;
                console.error(`${section}.${name}`);
              } else {
                console.error(dispatchError.toString());
              }
            }
          } else if (status.isFinalized) {
            console.log(
              `Transaction finalized at blockHash ${status.asFinalized}`
            );
            alert(`Transaction finalized at blockHash ${status.asFinalized}`);
            unsub();
          }
        }
      );
    } catch (error) {
      console.error("Error during transaction:", error);
      alert(`Error during transaction: ${error}`);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ api, sendTransaction }}>
      {children}
    </ApiContext.Provider>
  );
};
