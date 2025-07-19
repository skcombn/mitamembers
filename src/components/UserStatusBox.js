import dayjs from "dayjs";
import { IconButton, Heading, HStack } from "@chakra-ui/react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { user_localstorage_key } from "../utils/constants";
import useLocalStorageState from "use-local-storage-state";
import { useAddAuditlog } from "../react-query/auditlog/useAddAuditlog";

const UserStatusBox = () => {
  const [localstate, setLocalState, { removeItem }] = useLocalStorageState(
    user_localstorage_key
  );

  const addAuditlog = useAddAuditlog();

  const handleSignOut = () => {
    setLocalState({});
  };

  return (
    <HStack justify="space-between">
      <Heading size="sm">
        {localstate.userid && localstate.userid.length > 0
          ? localstate.userid
          : "unknown"}
      </Heading>

      {localstate.userid && localstate.userid.length > 0 && (
        <IconButton
          icon={<RiLogoutBoxRLine />}
          display={{ base: "block", md: "inline-flex" }}
          fontSize={"28"}
          fontWeight={600}
          color="teal"
          bg={"white"}
          href={"#"}
          _hover={{
            bg: "teal.300",
          }}
          onClick={handleSignOut}
        ></IconButton>
      )}
    </HStack>
  );
};

export default UserStatusBox;
