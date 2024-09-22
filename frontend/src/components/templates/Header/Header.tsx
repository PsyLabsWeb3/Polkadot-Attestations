import { Link, Flex, Button, Select, Text } from "@chakra-ui/react";
import { useWallet } from "../../contexts/AccountContext";

interface Account {
  address: string;
  // Add other properties if needed
}

function Header() {
  const {
    allAccounts,
    selectedAccount,
    handleConnectWallet,
    handleSelectAccount,
    formatAccount,
  } = useWallet();
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
      <Text>
        {selectedAccount
          ? formatAccount(selectedAccount)
          : "no account found, select account"}
      </Text>
      {allAccounts.length === 0 ? (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      ) : null}

      {allAccounts.length > 0 ? (
        <>
          <Select
            onChange={handleSelectAccount}
            maxWidth="8rem"
            placeholder="Select Account"
          >
            {allAccounts.map((account: Account) => (
              <option key={account.address} value={account.address}>
                {formatAccount(account.address)}
              </option>
            ))}
          </Select>
        </>
      ) : null}
    </Flex>
  );
}

export default Header;
