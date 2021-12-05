import { gql } from '@apollo/client'

export const searchQuery = gql`
query Search($phrase: String!) {
  search(phrase: $phrase) {
    ... on User {
      name
      lastName
      username
    }
    ... on Recipe {
      idRecipe
      name
      description
      tags {
        name
      }
    }
  }
}

`;