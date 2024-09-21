import { Link, Flex, Button } from "@chakra-ui/react";

function Header () {
  return (
    <Flex as="header" w="100%s" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="black">
      <Link href="/" fontSize="2xl" fontWeight="bold">PolkAttest</Link>
      <Link href="/" fontSize="2xl" fontWeight="bold">PolkAttest</Link>
      <Button >Connect Wallet</Button>
    </Flex>
  );
}

export default Header;