import { gql } from '@apollo/client'

export interface LoginResponse {
    login: {
        user: {
            username: string,
            name: string,
            lastName: string
        },
        jwt: string
    }
}

export interface LoginResponseParams {
    username: string,
    password: string
}

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