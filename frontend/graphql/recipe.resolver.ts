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
`
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