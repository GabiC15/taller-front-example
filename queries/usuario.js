import { gql, useQuery } from "@apollo/client";

export const CREATE_USUARIO = gql`
  mutation createUsuario($nombres: String!) {
    createUsuario(input: { nombres: $nombres }) {
      id
    }
  }
`;
