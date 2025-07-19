import React from "react";
import { Box, Text, Heading, HStack } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <HStack justify="space-between">
        <Text
          fontSize="xx-large"
          fontWeight="extrabold"
          fontFamily={"serif"}
          color="teal"
        >
          Mita Tea Shop
        </Text>
        <Text
          fontSize="x-large"
          fontWeight="bold"
          fontFamily={"serif"}
          color="teal"
        >
          Membership System
        </Text>
      </HStack>
    </Box>
  );
}
