import { gql } from '@apollo/client'

export const loginMutation = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      name
      lastName
      username
      role {
        name
      }
    }
    jwt
  }
}
`;