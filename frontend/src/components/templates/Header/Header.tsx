import { Link, Flex, Button, Select, Text } from "@chakra-ui/react";
import { useWallet } from "../../contexts/AccountContext";
import { useLocation } from "react-router-dom";

interface Account {
  address: string;
}

function Header() {
  const {
    allAccounts,
    selectedAccount,
    isWalletConnected,
    handleConnectWallet,
    handleSelectAccount,
    formatAccount,
  } = useWallet();

  const location = useLocation();
  const currentPath = location.pathname;
  const buttonAndSelectWidth = "11rem";

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
      position="relative"
    >
      {/* Logo PolkAttest - redirects to homepage */}
      <Link
        href="/"
        fontSize="2xl"
        fontWeight="bold"
        _hover={{ textDecoration: "none" }}
      >
        PolkAttest
      </Link>

      {/* Navigation links */}
      <Flex gap="2rem" justify="center" flex="1" position="relative">
        {/* Home link should not appear on the home page */}
        {currentPath !== "/" && (
          <Link
            href="/"
            fontSize="lg"
            fontWeight="medium"
            color="gray.500"
            _hover={{ textDecoration: "none" }}
          >
            Home
          </Link>
        )}

        <Link
          href="/userdashboard"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
          _hover={{ textDecoration: "none" }}
        >
          My Dashboard
        </Link>

        <Link
          href="/create-schema"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
          _hover={{ textDecoration: "none" }}
        >
          Create Schema
        </Link>

        <Link
          href="/attest"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
          _hover={{ textDecoration: "none" }}
        >
          Attest
        </Link>

        <Link
          href="/scan"
          fontSize="lg"
          fontWeight="medium"
          color="gray.500"
          _hover={{ textDecoration: "none" }}
        >
          Scan
        </Link>
      </Flex>

      {/* Display wallet connection status */}
      <Text
        position="absolute"
        right="230px"
        top="50%"
        transform="translateY(-50%)"
        color="gray.700"
      >
        {isWalletConnected && !selectedAccount && allAccounts.length > 0 ? (
          <strong>Please select your account.</strong>
        ) : null}
        {isWalletConnected && allAccounts.length === 0 ? (
          <strong>Account not connected.</strong>
        ) : null}
      </Text>

      {/* Show "Connect Wallet" button only if no wallet is connected */}
      {!isWalletConnected && (
        <Button width={buttonAndSelectWidth} onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      )}

      {/* Dropdown for selecting wallet account only if wallet is connected */}
      {isWalletConnected && (
        <Select
          onChange={handleSelectAccount}
          bgColor="gray.300"
          maxWidth={buttonAndSelectWidth}
          placeholder={
            allAccounts.length > 0 ? "Select Account" : "No accounts"
          }
          size="lg"
          variant="filled"
          value={selectedAccount || ""}
          isDisabled={allAccounts.length === 0}
          _hover={{
            color: "black",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
            transition: "0.4s",
          }}
        >
          {allAccounts.length > 0 &&
            allAccounts.map((account: Account, index: number) => (
              <option
                key={index}
                value={account.address}
                style={{
                  color: "black",
                }}
              >
                {formatAccount(account.address)}
              </option>
            ))}
        </Select>
      )}
    </Flex>
  );
}

export default Header;
