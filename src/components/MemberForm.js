import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "../helpers/CustomToastify";
import dayjs from "dayjs";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Modal, Select, Switch } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMembers } from "../react-query/members/useMembers";
import { useGroups } from "../react-query/groups/useGroups";
import { useAddGroup } from "../react-query/groups/useAddGroup";
import GroupForm from "./GroupForm";

const initial_group = {
  group_desp: "",
  group_category: "",
};

const MemberForm = ({
  state,
  setState,
  add_Form,
  update_Form,
  statustype,
  onFormClose,
}) => {
  const field_width = "180";
  const field_gap = "3";
  const { members } = useMembers();
  const { groups } = useGroups();
  const addGroup = useAddGroup();
  const [grouptype, setGrouptype] = useState("");
  const [groupstatustype, setGroupStatusType] = useState("");
  const [claim25checked, setClaim25Checked] = useState(state.m_claim25);
  const [claim15checked, setClaim15Checked] = useState(state.m_claim15);

  const {
    isOpen: isGroupOpen,
    onOpen: onGroupOpen,
    onClose: onGroupClose,
  } = useDisclosure();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      ...state,
    },
  });

  const onSubmit = (values) => {
    if (statustype === "edit") {
      update_Form(values);
      onFormClose();
    }
    if (statustype === "add") {
      const { m_mobile } = values;
      const found = members.some(
        (el) => el.m_mobile.toLowerCase() === m_mobile.toLowerCase()
      );
      if (found) {
        Toast({
          title: `This mobile no ${m_mobile} is existed !`,
          status: "warning",
          customId: "memadd",
        });
      } else {
        add_Form(values);
        onFormClose();
      }
    }
  };

  const handleExit = () => {
    onFormClose();
  };

  const add_Group = (data) => {
    addGroup(data);
  };

  const update_Group = (data) => {
    onGroupClose();
  };

  const handleAddGroup = (grouptype) => {
    setGrouptype(grouptype);
    setGroupStatusType((prev) => (prev = "add"));
    const data = { ...initial_group };
    setState(data);
    onGroupOpen();
  };

  const handleClaim25Check = (data) => {
    setClaim25Checked((prev) => (prev = data));
    if (!claim25checked) {
      setValue(
        "m_claim25remark",
        dayjs().format("YYYY-MM-DD") + " " + dayjs().format("HH:mm:ss")
      );
    } else {
      setValue("m_claim25remark", "");
    }
  };

  const handleClaim15Check = (data) => {
    setClaim15Checked(data);
    if (!claim15checked) {
      setValue(
        "m_claim15remark",
        dayjs().format("YYYY-MM-DD") + " " + dayjs().format("HH:mm:ss")
      );
    } else {
      setValue("m_claim15remark", "");
    }
  };

  return (
    <Flex
      h={{ base: "auto", md: "auto" }}
      py={[0, 0, 0]}
      direction={{ base: "column-reverse", md: "row" }}
      overflowY="scroll"
    >
      <VStack
        w={{ base: "auto", md: "full" }}
        h={{ base: "auto", md: "full" }}
        p="2"
        spacing="10"
        //alignItems="flex-start"
      >
        <form>
          <Grid templateColumns="repeat(5, 1fr)" gap={1} py={2}>
            <GridItem colSpan={2}>
              <VStack alignItems={"flex-start"} px={1}>
                <Heading size="lg">Member Form</Heading>
                <Divider border="2px solid teal" w={300} />
              </VStack>
            </GridItem>
            <GridItem colSpan={2}></GridItem>
            <GridItem>
              <HStack alignItems={"flex-end"} py={2}>
                <ButtonGroup>
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    variant="outline"
                    size="lg"
                  >
                    Submit
                  </Button>
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    onClick={handleExit}
                    variant="outline"
                    size="lg"
                  >
                    Close
                  </Button>
                </ButtonGroup>
              </HStack>
            </GridItem>
          </Grid>
          <Grid
            templateColumns="repeat(6, 1fr)"
            columnGap={3}
            rowGap={3}
            px={5}
            py={2}
            w={{ base: "auto", md: "full", lg: "full" }}
            border="1px solid teal"
            borderRadius="10"
          >
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_name"
                  defaultValue={state.m_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Name
                      </Text>
                      <Input
                        name="m_name"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="name"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_mobile"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Mobile
                      </Text>
                      <Input
                        name="m_mobile"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="mobile"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_email"
                  defaultValue={state.u_email}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Email
                      </Text>
                      <Input
                        name="m_email"
                        value={value || ""}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="email"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_dobtext"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        DOBText
                      </Text>
                      <Input
                        name="m_dobtext"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="birthdate"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_birthdate"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Birth Date
                      </Text>
                      <Input
                        name="m_birthdate"
                        value={value}
                        type="date"
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="birthdate"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_gender"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Gender
                      </Text>
                      <Select
                        name="m_gender"
                        value={value || ""}
                        width="full"
                        size="md"
                        onChange={onChange}
                        //borderColor="gray.400"
                        //textTransform="capitalize"
                        ref={ref}
                        data={[
                          { value: "Female", label: "Female" },
                          {
                            value: "Male",
                            label: "Male",
                          },
                        ]}
                        nothingFound="None"
                        clearable
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_remark"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Remark
                      </Text>
                      <Input
                        name="m_remark"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="remark"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_claim25"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        25% Voucher Claim
                      </Text>
                      <Switch
                        name="m_claim25"
                        value={value || false}
                        label={<Heading size="sm" pt={2}></Heading>}
                        onLabel="ON"
                        offLabel="OFF"
                        size="xl"
                        precision={2}
                        checked={claim25checked}
                        width="full"
                        onChange={(e) => {
                          onChange(e.target.checked);
                          handleClaim25Check(e.target.checked);
                        }}
                        ref={ref}
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_claim25remark"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Remark
                      </Text>
                      <Input
                        name="m_claim25remark"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="remark"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_claim15"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        15% Voucher Claim
                      </Text>

                      <Switch
                        name="m_claim15"
                        value={value || false}
                        label={<Heading size="sm" pt={2}></Heading>}
                        onLabel="ON"
                        offLabel="OFF"
                        size="xl"
                        precision={2}
                        checked={claim15checked}
                        width="full"
                        onChange={(e) => {
                          onChange(e.target.checked);
                          handleClaim15Check(e.target.checked);
                        }}
                        ref={ref}
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4} mt={field_gap}>
              <FormControl>
                <Controller
                  control={control}
                  name="m_claim15remark"
                  //defaultValue={state.u_name}
                  render={({ field: { onChange, value, ref } }) => (
                    <VStack align="left" alignItems="left" py={1}>
                      <Text as="b" fontSize="sm" textAlign="left" p={1}>
                        Remark
                      </Text>
                      <Input
                        name="m_claim15remark"
                        value={value}
                        width="full"
                        onChange={onChange}
                        borderColor="gray.400"
                        ref={ref}
                        placeholder="remark"
                        minWidth="100"
                      />
                    </VStack>
                  )}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </form>
      </VStack>
      <Modal opened={isGroupOpen} onClose={onGroupClose} size="lg">
        <GroupForm
          state={state}
          setState={setState}
          add_Group={add_Group}
          update_Group={update_Group}
          statustype={groupstatustype}
          onGroupClose={onGroupClose}
          grouptype={grouptype}
        />
      </Modal>
    </Flex>
  );
};

export default MemberForm;
