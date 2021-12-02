import { gql } from '@apollo/client'

export const getUserQuery = gql`
query getUser($username: String!) {
  getUser(username: $username) {
    username
    name
    lastName
    followers {
      username
    }
    following{
      username
    }
    recipes {
      idRecipe
      name
      description
      photo
      tags {
        name
      }
      user{
        username
      }
    }
  }
}
`;

export const followUserMutation = gql`
mutation FollowUser($username:String!){
  followUser(username:$username){
    username
  }
}
`;