import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

// Define the type for an account object
interface Account {
  address: string;
  meta: {
    name?: string;
    source: string;
  };
}

// Define the types for the context
interface WalletContextType {
  allAccounts: Account[];
  selectedAccount: string | null;
  handleConnectWallet: () => void;
  handleSelectAccount: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  formatAccount: (account: string) => string;
}

//Name of dapp
const NAME = "PolkAttest";

// Create the context with a default value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Define the provider component
interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const storedAccounts = sessionStorage.getItem("allAccounts");
  const [allAccounts, setAllAccounts] = useState<Account[]>(
    storedAccounts ? JSON.parse(storedAccounts) : []
  );

  const [selectedAccount, setSelectedAccount] = useState<string | null>(
    sessionStorage.getItem("selectedAccount") || null
  );

  const handleConnectWallet = async () => {
    const extensions = await web3Enable(NAME);

    if (!extensions) {
      throw new Error("No wallet installed found");
    }

    const localAccounts = await web3Accounts();
    setAllAccounts(localAccounts);
    sessionStorage.setItem("allAccounts", JSON.stringify(localAccounts));
  };

  const handleSelectAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddress = event.target.value;
    const account = allAccounts.find(
      (acc: Account) => acc.address === selectedAddress
    );

    if (!account) {
      throw new Error("Account not found");
    }

    setSelectedAccount(account.address);
    sessionStorage.setItem("selectedAccount", account.address);
  };

  useEffect(() => {
    if (selectedAccount) {
      sessionStorage.setItem("selectedAccount", selectedAccount);
    }
  }, [selectedAccount]);

  const formatAccount = (account: string) => {
    if (account && account.length > 4) {
      return `...${account.slice(-4)}`;
    }
    return account;
  };

  return (
    <WalletContext.Provider
      value={{
        allAccounts,
        selectedAccount,
        handleConnectWallet,
        handleSelectAccount,
        formatAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the WalletContext
const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export { WalletProvider, useWallet };
