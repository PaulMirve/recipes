import { gql } from '@apollo/client'

export const saveCommentMutation = gql`
mutation SaveComment($comment: CommentInput!) {
  saveComment(comment: $comment) {
    idComment
    comment
    dateCreated
    user{
      username
      name
      lastName
    }
    likes{
      username
    }
  }
}
`
export const getRecipeCommentsQuery = gql`
query GetRecipeComments($idRecipe: Int!) {
  getRecipeComments(idRecipe: $idRecipe) {
    idComment
    comment
    user {
      username
    }
  }
}

`