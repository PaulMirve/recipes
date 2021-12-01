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
    dateCreated
    ingredients{
      name
      quantity
      unit{
        name
      }
    }
    steps{
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