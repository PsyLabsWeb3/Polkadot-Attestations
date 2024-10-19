import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  web3Accounts,
  web3Enable,
  web3AccountsSubscribe,
} from "@polkadot/extension-dapp";

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
  isWalletConnected: boolean;
  handleConnectWallet: () => void;
  handleSelectAccount: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  formatAccount: (account: string) => string;
}

// Name of dapp
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

  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(
    allAccounts.length > 0
  );

  const handleConnectWallet = async () => {
    const extensions = await web3Enable(NAME);

    if (!extensions.length) {
      alert(
        "Polkadot JS Extension is not installed. Please install it to continue."
      );
      return;
    }

    const localAccounts = await web3Accounts();
    setAllAccounts(localAccounts);
    setIsWalletConnected(true);
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

  // Subscribe to account changes in the Polkadot extension
  useEffect(() => {
    const subscribeToAccountChanges = async () => {
      await web3Enable(NAME);

      const unsubscribe = await web3AccountsSubscribe((newAccounts) => {
        setAllAccounts(newAccounts);
        sessionStorage.setItem("allAccounts", JSON.stringify(newAccounts));

        if (
          selectedAccount &&
          !newAccounts.some((account) => account.address === selectedAccount)
        ) {
          const previousAccount = sessionStorage.getItem("selectedAccount");

          if (
            previousAccount &&
            newAccounts.some((account) => account.address === previousAccount)
          ) {
            setSelectedAccount(previousAccount);
          } else {
            setSelectedAccount(null);
            sessionStorage.removeItem("selectedAccount");
          }
        }

        if (newAccounts.length === 0) {
          setIsWalletConnected(false);
          sessionStorage.removeItem("allAccounts");
          sessionStorage.removeItem("selectedAccount");
        }
      });

      return () => unsubscribe();
    };

    subscribeToAccountChanges();
  }, [selectedAccount]);

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
        isWalletConnected,
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
