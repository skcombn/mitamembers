import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import MembersTable from "./MembersTable";

function Home() {
  return (
    <Box
      w="95%"
      h="auto"
      overflow="scroll"
      px={5}
      m={5}
      border="1px solid teal"
      borderRadius={10}
    >
      <MembersTable />
    </Box>
  );
}

export default Home;
