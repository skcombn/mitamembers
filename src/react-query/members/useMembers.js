import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = `http://localhost:4000/graphql`;
//const API_URL = `http://192.168.0.107:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function getAllMembers(id) {
  const { allMembers } = await graphQLClient.request(
    gql`
      query getAllMembers {
        allMembers {
          m_id
          m_name
          m_mobile
          m_dobtext
          m_birthdate
          m_joindate
          m_email
          m_gender
          m_points
          m_stamps
          m_remark
          m_claim25
          m_claim15
          m_claim25remark
          m_claim15remark
        }
      }
    `
  );
  return allMembers;
}

export function useMembers() {
  const [memId, setMemId] = useState("");

  const fallback = [];
  const { data: members = fallback } = useQuery({
    queryKey: [queryKeys.members, memId],
    queryFn: () => getAllMembers(memId),
  });

  return { members, setMemId };
}
