import { useState } from "react";
import { Link, Flex, Button, Select } from "@chakra-ui/react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const NAME = "PolkAttest";

function Header() {
  const [allAccounts, setAllAccounts] = useState<any>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const handleConnectWallet = async () => {
    const extensions = await web3Enable(NAME);

    if (!extensions) {
      throw new Error("No wallet installed found");
    }

    const localAccounts = await web3Accounts();
    setAllAccounts(localAccounts);

    if (localAccounts.length === 1) {
      setSelectedAccount(localAccounts[0]);
      console.log("Selected Account", selectedAccount);
    }

    console.log(allAccounts);
  };

  const handleSelectAccount = (account: any) => {
    setSelectedAccount(account);
  };

  //SLICE ACCOUNT TO SHOW ONLY LAST 4 DIGITS AND # POINTS
  const formatAccount = (account: string) => {
    if (account && account.length > 4) {
      return `...${account.slice(-4)}`;
    }
    return account;
  };

  console.log("Selected Account", selectedAccount);

  return (
    <Flex
      as="header"
      w="100%s"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="black"
    >
      <Link href="/" fontSize="2xl" fontWeight="bold">
        PolkAttest
      </Link>
      <Link href="/" fontSize="2xl" fontWeight="bold">
        PolkAttest
      </Link>
      {allAccounts.length === 0 ? (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      ) : null}
      {allAccounts.length === 1 && selectedAccount ? (
        <Button onClick={handleConnectWallet}>
          {formatAccount(selectedAccount.address)}
        </Button>
      ) : (
        <></>
      )}
      {allAccounts.length > 0 && !selectedAccount ? (
        <>
          <Select placeholder="Select Account">
            {allAccounts.map((account: any) => (
              <option
                key={account.address}
                value={account.address}
                onClick={() => handleSelectAccount(account)}
              >
                {formatAccount(account.address)}
              </option>
            ))}
          </Select>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}

export default Header;
