import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; // Importamos el Link de react-router-dom
import { Link, Flex, Button, Select, Box, Text } from "@chakra-ui/react";
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

  // Formatea la cuenta para mostrar solo los últimos 4 dígitos
  const formatAccount = (account: string) => {
    if (account && account.length > 4) {
      return `...${account.slice(-4)}`;
    }
    return account;
  };

  return (
    <Flex
      as="header"
      w="100%"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg="white"
      boxShadow="md"
    >
      {/* Sección del Logo */}
      <Text fontSize="2xl" fontWeight="bold" color="gray.500">
        Logo
      </Text>

      {/* Enlaces de navegación */}
      <Flex align="center" gap="2rem">
        <Link as={RouterLink} to="/schemas" fontSize="lg" fontWeight="medium" color="gray.500">
          Schemas
        </Link>
        <Link as={RouterLink} to="/attestations" fontSize="lg" fontWeight="medium" color="gray.500">
          Attestations
        </Link>
      </Flex>

      {/* Botón de conectar billetera */}
      <Flex align="center">
        {allAccounts.length === 0 ? (
          <Button onClick={handleConnectWallet} bg="pink.500" color="white" _hover={{ bg: "pink.600" }}>
            Connect Wallet
          </Button>
        ) : null}
        {allAccounts.length === 1 && selectedAccount ? (
          <Button onClick={handleConnectWallet} bg="pink.500" color="white" _hover={{ bg: "pink.600" }}>
            {formatAccount(selectedAccount.address)}
          </Button>
        ) : null}
        {allAccounts.length > 0 && !selectedAccount ? (
          <Select placeholder="Select Account" onChange={(e) => handleSelectAccount(e.target.value)}>
            {allAccounts.map((account: any) => (
              <option key={account.address} value={account.address}>
                {formatAccount(account.address)}
              </option>
            ))}
          </Select>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default Header;
