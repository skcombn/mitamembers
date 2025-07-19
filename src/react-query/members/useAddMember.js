import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = `http://localhost:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function addMember(data) {
  const { itemdata } = await graphQLClient.request(
    gql`
      mutation AddMember(
        $m_name: String
        $m_mobile: String
        $m_dobtext: String
        $m_birthdate: Date
        $m_joindate: Date
        $m_email: String
        $m_gender: String
        $m_points: Int
        $m_stamps: Int
        $m_remark: String
        $m_claim25: Boolean
        $m_claim15: Boolean
        $m_claim25remark: String
        $m_claim15remark: String
      ) {
        addMember(
          m_name: $m_name
          m_mobile: $m_mobile
          m_dobtext: $m_dobtext
          m_birthdate: $m_birthdate
          m_joindate: $m_joindate
          m_email: $m_email
          m_gender: $m_gender
          m_points: $m_points
          m_stamps: $m_stamps
          m_remark: $m_remark
          m_claim25: $m_claim25
          m_claim15: $m_claim15
          m_claim25remark: $m_claim25remark
          m_claim15remark: $m_claim15remark
        ) {
          m_id
        }
      }
    `,
    data
  );
  return itemdata;
}

export function useAddMember(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addMember(data),
    onSuccess: () => {
      Toast({
        title: "New Member being added!",
        status: "success",
        customId: "memAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Member Add Error!",
        status: "warning",
        customId: "memAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("members");
    },
  });

  return mutate;
}
