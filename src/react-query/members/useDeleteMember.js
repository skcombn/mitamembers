import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";
import { GraphQLClient, gql } from "graphql-request";

//const API_URL = `http://localhost:4000/graphql`;
const API_URL = process.env.REACT_APP_API_URL;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function deleteMember(data) {
  const { itemdata } = await graphQLClient.request(
    gql`
      mutation DeleteMember($m_id: ID) {
        deleteMember(m_id: $m_id) {
          m_id
        }
      }
    `,
    data
  );
  return itemdata;
}

export function useDeleteMember(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteMember(data),
    onSuccess: () => {
      Toast({
        title: "Member being deleted!",
        status: "warning",
        customId: "memdel",
      });
    },
    onError: () => {
      Toast({
        title: "Member Delete Error!",
        status: "warning",
        customId: "memErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("members");
    },
  });

  return mutate;
}
