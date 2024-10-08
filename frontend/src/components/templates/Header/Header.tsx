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
      w="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="black"
    >
      {/* Logo PolkAttest */}
      <Link href="/" fontSize="2xl" fontWeight="bold">
        PolkAttest
      </Link>

      {/* Menú de navegación */}
      <Flex gap="2rem">
        <Link href="/" fontSize="lg" fontWeight="medium" color="gray.500">
          Home
        </Link>
        <Link
          href="/userdashboard"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
        >
          My Dashboard
        </Link>
        <Link href="/attest" fontSize="lg" fontWeight="medium" color="gray.500">
          Attestations
        </Link>
        <Link
          href="/schemas"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
        >
          Schemas
        </Link>
        <Link href="/scan" fontSize="lg" fontWeight="medium" color="gray.500">
          Scan
        </Link>
      </Flex>

      {/* Estado de la cuenta conectada */}
      <Text>
        {selectedAccount
          ? formatAccount(selectedAccount)
          : "no account found, select account"}
      </Text>

      {allAccounts.length === 0 ? (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      ) : null}

      {allAccounts.length > 0 ? (
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
      ) : null}
    </Flex>
  );
}

export default Header;
