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
  dateCreated: Scalars['String'];
  idComment: Scalars['Int'];
  likes: Array<User>;
  user: User;
};

export type CommentInput = {
  comment: Scalars['String'];
  idRecipe: Scalars['Int'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  name: Scalars['String'];
  quantity: Scalars['Int'];
  unit: Unit;
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
  getRecipe: Recipe;
  getRecipeComments: Array<Comment>;
  getRecipes: Array<Recipe>;
  getUnits: Array<Unit>;
  getUser: User;
  getUsers: Array<User>;
  isAuthenticated: User;
};


export type QueryGetRecipeArgs = {
  idRecipe: Scalars['Int'];
};


export type QueryGetRecipeCommentsArgs = {
  idRecipe: Scalars['Int'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  bookmarkedBy: Array<User>;
  comments: Array<Comment>;
  dateCreated: Scalars['String'];
  description: Scalars['String'];
  idRecipe: Scalars['Int'];
  ingredients: Array<Ingredient>;
  likes: Array<User>;
  name: Scalars['String'];
  numberOfPeople: Scalars['Int'];
  photo: Scalars['String'];
  steps: Array<Step>;
  tags: Array<Tag>;
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
  bookmarks: Array<Recipe>;
  followers: Array<User>;
  following: Array<User>;
  lastName: Scalars['String'];
  name: Scalars['String'];
  recipes: Array<Recipe>;
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

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: { __typename?: 'User', name: string, lastName: string, username: string, role: { __typename?: 'Role', name: string } } };

export type SaveCommentMutationVariables = Exact<{
  comment: CommentInput;
}>;


export type SaveCommentMutation = { __typename?: 'Mutation', saveComment: { __typename?: 'Comment', idComment: number, comment: string, dateCreated: string, user: { __typename?: 'User', username: string, name: string, lastName: string }, likes: Array<{ __typename?: 'User', username: string }> } };

export type GetRecipeCommentsQueryVariables = Exact<{
  idRecipe: Scalars['Int'];
}>;


export type GetRecipeCommentsQuery = { __typename?: 'Query', getRecipeComments: Array<{ __typename?: 'Comment', idComment: number, comment: string, user: { __typename?: 'User', username: string } }> };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', idRecipe: number, name: string, description: string, numberOfPeople: number, photo: string, likes: Array<{ __typename?: 'User', name: string }>, user: { __typename?: 'User', username: string }, tags: Array<{ __typename?: 'Tag', name: string }> }> };

export type GetRecipeIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipeIdsQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', idRecipe: number }> };

export type GetRecipeQueryVariables = Exact<{
  idRecipe: Scalars['Int'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', getRecipe: { __typename?: 'Recipe', idRecipe: number, name: string, description: string, numberOfPeople: number, photo: string, dateCreated: string, ingredients: Array<{ __typename?: 'Ingredient', name: string, quantity: number, unit: { __typename?: 'Unit', name: string } }>, steps: Array<{ __typename?: 'Step', description: string }>, likes: Array<{ __typename?: 'User', username: string }>, user: { __typename?: 'User', username: string }, tags: Array<{ __typename?: 'Tag', name: string }>, comments: Array<{ __typename?: 'Comment', idComment: number, comment: string, likes: Array<{ __typename?: 'User', username: string }>, user: { __typename?: 'User', username: string, name: string, lastName: string } }>, bookmarkedBy: Array<{ __typename?: 'User', username: string }> } };

export type LikeRecipeMutationVariables = Exact<{
  idRecipe: Scalars['Int'];
}>;


export type LikeRecipeMutation = { __typename?: 'Mutation', likeRecipe: { __typename?: 'Recipe', idRecipe: number } };

export type BookmarkRecipeMutationVariables = Exact<{
  idRecipe: Scalars['Int'];
}>;


export type BookmarkRecipeMutation = { __typename?: 'Mutation', bookmarkRecipe: { __typename?: 'Recipe', idRecipe: number } };

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'Query', getUnits: Array<{ __typename?: 'Unit', idUnit: string, name: string }> };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', username: string, name: string, lastName: string, followers: Array<{ __typename?: 'User', username: string }>, following: Array<{ __typename?: 'User', username: string }>, recipes: Array<{ __typename?: 'Recipe', name: string, description: string, photo: string, tags: Array<{ __typename?: 'Tag', name: string }> }> } };


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
export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  isAuthenticated {
    name
    lastName
    username
    role {
      name
    }
  }
}
    `;

/**
 * __useIsAuthenticatedQuery__
 *
 * To run a query within a React component, call `useIsAuthenticatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAuthenticatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAuthenticatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsAuthenticatedQuery(baseOptions?: Apollo.QueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
      }
export function useIsAuthenticatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export type IsAuthenticatedQueryHookResult = ReturnType<typeof useIsAuthenticatedQuery>;
export type IsAuthenticatedLazyQueryHookResult = ReturnType<typeof useIsAuthenticatedLazyQuery>;
export type IsAuthenticatedQueryResult = Apollo.QueryResult<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;
export const SaveCommentDocument = gql`
    mutation SaveComment($comment: CommentInput!) {
  saveComment(comment: $comment) {
    idComment
    comment
    dateCreated
    user {
      username
      name
      lastName
    }
    likes {
      username
    }
  }
}
    `;
export type SaveCommentMutationFn = Apollo.MutationFunction<SaveCommentMutation, SaveCommentMutationVariables>;

/**
 * __useSaveCommentMutation__
 *
 * To run a mutation, you first call `useSaveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCommentMutation, { data, loading, error }] = useSaveCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useSaveCommentMutation(baseOptions?: Apollo.MutationHookOptions<SaveCommentMutation, SaveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCommentMutation, SaveCommentMutationVariables>(SaveCommentDocument, options);
      }
export type SaveCommentMutationHookResult = ReturnType<typeof useSaveCommentMutation>;
export type SaveCommentMutationResult = Apollo.MutationResult<SaveCommentMutation>;
export type SaveCommentMutationOptions = Apollo.BaseMutationOptions<SaveCommentMutation, SaveCommentMutationVariables>;
export const GetRecipeCommentsDocument = gql`
    query GetRecipeComments($idRecipe: Int!) {
  getRecipeComments(idRecipe: $idRecipe) {
    idComment
    comment
    user {
      username
    }
  }
}
    `;

/**
 * __useGetRecipeCommentsQuery__
 *
 * To run a query within a React component, call `useGetRecipeCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeCommentsQuery({
 *   variables: {
 *      idRecipe: // value for 'idRecipe'
 *   },
 * });
 */
export function useGetRecipeCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>(GetRecipeCommentsDocument, options);
      }
export function useGetRecipeCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>(GetRecipeCommentsDocument, options);
        }
export type GetRecipeCommentsQueryHookResult = ReturnType<typeof useGetRecipeCommentsQuery>;
export type GetRecipeCommentsLazyQueryHookResult = ReturnType<typeof useGetRecipeCommentsLazyQuery>;
export type GetRecipeCommentsQueryResult = Apollo.QueryResult<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>;
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
    tags {
      name
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
export const GetRecipeIdsDocument = gql`
    query getRecipeIds {
  getRecipes {
    idRecipe
  }
}
    `;

/**
 * __useGetRecipeIdsQuery__
 *
 * To run a query within a React component, call `useGetRecipeIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipeIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipeIdsQuery, GetRecipeIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeIdsQuery, GetRecipeIdsQueryVariables>(GetRecipeIdsDocument, options);
      }
export function useGetRecipeIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeIdsQuery, GetRecipeIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeIdsQuery, GetRecipeIdsQueryVariables>(GetRecipeIdsDocument, options);
        }
export type GetRecipeIdsQueryHookResult = ReturnType<typeof useGetRecipeIdsQuery>;
export type GetRecipeIdsLazyQueryHookResult = ReturnType<typeof useGetRecipeIdsLazyQuery>;
export type GetRecipeIdsQueryResult = Apollo.QueryResult<GetRecipeIdsQuery, GetRecipeIdsQueryVariables>;
export const GetRecipeDocument = gql`
    query getRecipe($idRecipe: Int!) {
  getRecipe(idRecipe: $idRecipe) {
    idRecipe
    name
    description
    numberOfPeople
    photo
    dateCreated
    ingredients {
      name
      quantity
      unit {
        name
      }
    }
    steps {
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
    comments {
      idComment
      comment
      likes {
        username
      }
      user {
        username
        name
        lastName
      }
    }
    bookmarkedBy {
      username
    }
  }
}
    `;

/**
 * __useGetRecipeQuery__
 *
 * To run a query within a React component, call `useGetRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeQuery({
 *   variables: {
 *      idRecipe: // value for 'idRecipe'
 *   },
 * });
 */
export function useGetRecipeQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
      }
export function useGetRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
        }
export type GetRecipeQueryHookResult = ReturnType<typeof useGetRecipeQuery>;
export type GetRecipeLazyQueryHookResult = ReturnType<typeof useGetRecipeLazyQuery>;
export type GetRecipeQueryResult = Apollo.QueryResult<GetRecipeQuery, GetRecipeQueryVariables>;
export const LikeRecipeDocument = gql`
    mutation LikeRecipe($idRecipe: Int!) {
  likeRecipe(idRecipe: $idRecipe) {
    idRecipe
  }
}
    `;
export type LikeRecipeMutationFn = Apollo.MutationFunction<LikeRecipeMutation, LikeRecipeMutationVariables>;

/**
 * __useLikeRecipeMutation__
 *
 * To run a mutation, you first call `useLikeRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeRecipeMutation, { data, loading, error }] = useLikeRecipeMutation({
 *   variables: {
 *      idRecipe: // value for 'idRecipe'
 *   },
 * });
 */
export function useLikeRecipeMutation(baseOptions?: Apollo.MutationHookOptions<LikeRecipeMutation, LikeRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeRecipeMutation, LikeRecipeMutationVariables>(LikeRecipeDocument, options);
      }
export type LikeRecipeMutationHookResult = ReturnType<typeof useLikeRecipeMutation>;
export type LikeRecipeMutationResult = Apollo.MutationResult<LikeRecipeMutation>;
export type LikeRecipeMutationOptions = Apollo.BaseMutationOptions<LikeRecipeMutation, LikeRecipeMutationVariables>;
export const BookmarkRecipeDocument = gql`
    mutation BookmarkRecipe($idRecipe: Int!) {
  bookmarkRecipe(idRecipe: $idRecipe) {
    idRecipe
  }
}
    `;
export type BookmarkRecipeMutationFn = Apollo.MutationFunction<BookmarkRecipeMutation, BookmarkRecipeMutationVariables>;

/**
 * __useBookmarkRecipeMutation__
 *
 * To run a mutation, you first call `useBookmarkRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkRecipeMutation, { data, loading, error }] = useBookmarkRecipeMutation({
 *   variables: {
 *      idRecipe: // value for 'idRecipe'
 *   },
 * });
 */
export function useBookmarkRecipeMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkRecipeMutation, BookmarkRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkRecipeMutation, BookmarkRecipeMutationVariables>(BookmarkRecipeDocument, options);
      }
export type BookmarkRecipeMutationHookResult = ReturnType<typeof useBookmarkRecipeMutation>;
export type BookmarkRecipeMutationResult = Apollo.MutationResult<BookmarkRecipeMutation>;
export type BookmarkRecipeMutationOptions = Apollo.BaseMutationOptions<BookmarkRecipeMutation, BookmarkRecipeMutationVariables>;
export const GetUnitsDocument = gql`
    query getUnits {
  getUnits {
    idUnit
    name
  }
}
    `;

/**
 * __useGetUnitsQuery__
 *
 * To run a query within a React component, call `useGetUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnitsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
      }
export function useGetUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitsQuery, GetUnitsQueryVariables>(GetUnitsDocument, options);
        }
export type GetUnitsQueryHookResult = ReturnType<typeof useGetUnitsQuery>;
export type GetUnitsLazyQueryHookResult = ReturnType<typeof useGetUnitsLazyQuery>;
export type GetUnitsQueryResult = Apollo.QueryResult<GetUnitsQuery, GetUnitsQueryVariables>;
export const GetUserDocument = gql`
    query getUser($username: String!) {
  getUser(username: $username) {
    username
    name
    lastName
    followers {
      username
    }
    following {
      username
    }
    recipes {
      name
      description
      photo
      tags {
        name
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;