import { gql } from '@apollo/client'

export const getRecipesQuery = gql`
query getRecipes{
  getRecipes{
    idRecipe
    name
    description
    numberOfPeople
    photo
    likes{
        name
    }
    user{
        username
    }
    tags{
        name
    }
  }
}
`;
export const getRecipeIdsQuery = gql`
query getRecipeIds {
  getRecipes {
    idRecipe
  }
}
`;
export const getRecipeQuery = gql`
query getRecipe($idRecipe: Int!) {
  getRecipe(idRecipe: $idRecipe) {
    idRecipe
    name
    description
    numberOfPeople
    photo
    dateCreated
    ingredients{
      idIngredient
      name
      quantity
      unit{
        idUnit
        name
      }
    }
    steps{
      idStep
      description
    }
    likes {
      username
    }
    user {
      username
    }
    tags {
      name
    }
    comments{
      idComment
      comment
      likes{
        username
      }
      user{
        username
        name
        lastName
      }
    }
    bookmarkedBy{
      username
    }
  }
}
`;
export const likeRecipeMutation = gql`
mutation LikeRecipe($idRecipe: Int!) {
  likeRecipe(idRecipe: $idRecipe) {
    idRecipe
  }
}
`;
export const bookmarkRecipeMutation = gql`
mutation BookmarkRecipe($idRecipe: Int!) {
  bookmarkRecipe(idRecipe: $idRecipe) {
    idRecipe
  }
}
`;

export const getRecipeByTagQuery = gql`
query getRecipesByTag($tagName: String!) {
  getRecipesByTag(tagName: $tagName) {
    idRecipe
    name
    description
    numberOfPeople
    photo
    likes{
        name
    }
    user{
        username
    }
    tags{
        name
    }
  }
}
`;

export const getRecipesFromFollowedPeopleQuery = gql`
query GetRecipesFromFollowedPeople($skip: Int, $limit: Int) {
  getRecipesFromFollowedPeople(skip: $skip, limit: $limit) {
    idRecipe
    name
    description
    numberOfPeople
    photo
    likes {
      name
    }
    user {
      username
    }
    tags {
      name
    }
  }
}
`;

export const deleteRecipeMutation = gql`
mutation DeleteRecipe($idRecipe: Int!){
  deleteRecipe(idRecipe: $idRecipe)
}
`;