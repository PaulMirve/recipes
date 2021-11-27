import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  idComment: Scalars['Int'];
  likes: Array<User>;
  user: User;
};

export type CommentInput = {
  comment: Scalars['String'];
  idRecipe: Scalars['Int'];
  idUser: Scalars['Int'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type IngredientInput = {
  idUnit: Scalars['Int'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type Login = {
  __typename?: 'Login';
  jwt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkRecipe: Recipe;
  followUser: User;
  likeComment: Comment;
  likeRecipe: Recipe;
  login: Login;
  saveComment: Comment;
  saveRecipe: Recipe;
  saveUser: User;
};


export type MutationBookmarkRecipeArgs = {
  idRecipe: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  idUser: Scalars['Int'];
};


export type MutationLikeCommentArgs = {
  idComment: Scalars['Int'];
};


export type MutationLikeRecipeArgs = {
  idRecipe: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSaveCommentArgs = {
  comment: CommentInput;
};


export type MutationSaveRecipeArgs = {
  recipe: RecipeInput;
};


export type MutationSaveUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getRecipeComments: Array<Comment>;
  getRecipes: Array<Recipe>;
  getUnits: Array<Unit>;
  getUsers: Array<User>;
};


export type QueryGetRecipeCommentsArgs = {
  idRecipe: Scalars['Int'];
};

export type Recipe = {
  __typename?: 'Recipe';
  bookmarkedBy: Array<User>;
  description: Scalars['String'];
  idRecipe: Scalars['Int'];
  ingredients: Array<Ingredient>;
  likes: Array<User>;
  name: Scalars['String'];
  numberOfPeople: Scalars['Int'];
  photo: Scalars['String'];
  steps: Array<Step>;
  user: User;
};

export type RecipeInput = {
  description: Scalars['String'];
  ingredients: Array<IngredientInput>;
  name: Scalars['String'];
  numberOfPeople: Scalars['Int'];
  photo: Scalars['Upload'];
  steps: Array<StepInput>;
  tags: Array<TagInput>;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String'];
};

export type StepInput = {
  description: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
};

export type TagInput = {
  idRecipe: Scalars['Int'];
  name: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  idUnit: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  followers: Array<User>;
  following: Array<User>;
  lastName: Scalars['String'];
  name: Scalars['String'];
  role: Role;
  username: Scalars['String'];
};

export type UserInput = {
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', jwt: string, user: { __typename?: 'User', name: string, lastName: string, username: string, role: { __typename?: 'Role', name: string } } } };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', idRecipe: number, name: string, description: string, numberOfPeople: number, photo: string, likes: Array<{ __typename?: 'User', name: string }>, user: { __typename?: 'User', username: string } }> };


export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetRecipesDocument = gql`
    query getRecipes {
  getRecipes {
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
  }
}
    `;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;