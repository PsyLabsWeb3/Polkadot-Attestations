import { Box, Flex, Heading } from "@chakra-ui/react"
import Header from "../templates/Header/Header"

function Home () {
  return (
    <Flex flexDirection="column" w="100%" h="100vh"  bgGradient='linear(to-r, #7204ff, #FF2670)' >
        <Header />
        <Flex mt="10rem" justify="center" p="2rem">
            <Box >
                <Heading fontSize="4rem" color="white">PolkAttest Chain</Heading>
            </Box>
            </Flex>

    </Flex>
  )
}   

export default Home