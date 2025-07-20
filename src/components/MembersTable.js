import { useState, useMemo } from "react";
import { Toast } from "../helpers/CustomToastify";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Modal } from "@mantine/core";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useMembers } from "../react-query/members/useMembers";
import { useAddMember } from "../react-query/members/useAddMember";
import { useUpdateMember } from "../react-query/members/useUpdateMember";
import { useDeleteMember } from "../react-query/members/useDeleteMember";
import useLocalStorageState from "use-local-storage-state";
import { user_localstorage_key } from "../utils/constants";
import CustomReactTable from "../helpers/CustomReactTable";
import MemberForm from "./MemberForm";

const initial_state = {
  m_name: "",
  m_mobile: "",
  m_dobtext: "",
  m_birthdate: null,
  m_joindate: null,
  m_email: "",
  m_gender: "",
  m_points: 0,
  m_stamps: 0,
  m_remark: "",
  m_claim25: false,
  m_claim15: false,
  m_claim25remark: "",
  m_claim15remark: "",
};

const MembersTable = () => {
  const { members } = useMembers();
  const addMember = useAddMember();
  const updateMember = useUpdateMember();
  const deleteMember = useDeleteMember();
  const [state, setState] = useState({});
  const [statustype, setStatusType] = useState("");
  const [localstate, setLocalState, { removeItem }] = useLocalStorageState(
    user_localstorage_key
  );

  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const title = "Members";

  const columns = useMemo(
    () => [
      /*  {
        header: "Id",
        accessorFn: (row) => row.m_d,
        //size: 200,
        mantineTableBodyCellProps: {
          align: "left",
        },
      }, */
      {
        header: "Name",
        accessorKey: "m_name",
        size: 200,
        mantineTableBodyCellProps: {
          align: "left",
        },
        cell: (row) => (
          <div style={{ overflow: "hidden", textAlign: "left" }}>
            {row.m_name}
          </div>
        ),
      },
      {
        header: "Mobile",
        accessorFn: (row) => row.m_mobile,
        //size: 200,
        mantineTableBodyCellProps: {
          align: "left",
        },
      },
    ],
    []
  );

  const handleOnDeleteConfirm = () => {
    deleteMember(state);
  };

  const handleAddMember = () => {
    setStatusType((prev) => (prev = "add"));
    const data = { ...initial_state };
    setState(data);
    onFormOpen(true);
  };

  const handleEditMember = (row) => {
    const { original } = row;
    setStatusType((prev) => (prev = "edit"));
    setState((prev) => original);
    onFormOpen(true);
  };

  const handleDeleteMember = (row) => {
    if (localstate.level > 0) {
      const { original } = row;
      setState((prev) => original);
      onAlertDeleteOpen();
    } else {
      Toast({
        title: "You have no authorisation to delete this member!",
        status: "warning",
        customId: "custDel",
      });
    }
  };

  const add_Member = (data) => {
    addMember(data);
  };

  const update_Member = (data) => {
    updateMember(data);
  };

  return (
    <Flex p={5}>
      <Box
        width="100%"
        borderWidth={1}
        borderColor="teal.800"
        borderRadius={10}
        overflow="scroll"
      >
        <CustomReactTable
          title={title}
          columns={columns}
          data={members}
          initialState={{ sorting: [{ id: "m_name", desc: false }] }}
          handleAdd={handleAddMember}
          handleEdit={handleEditMember}
          handleDelete={handleDeleteMember}
        />
      </Box>
      <Modal opened={isFormOpen} onClose={onFormClose} size="xl">
        <MemberForm
          state={state}
          setState={setState}
          add_Form={add_Member}
          update_Form={update_Member}
          statustype={statustype}
          onFormClose={onFormClose}
        />
      </Modal>
      <AlertDialogBox
        onClose={onAlertDeleteClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertDeleteOpen}
        title="Delete Member"
      >
        u_
        <Heading size="md">
          Are you sure you want to delete this Member {state.m_name} ?
        </Heading>
      </AlertDialogBox>
    </Flex>
  );
};

export default MembersTable;
