import styles from '@sass/pages/recipe.module.scss';
import client from 'client';
import Heading from 'components/Heading';
import { Comment as CommentType, GetRecipeIdsQuery, GetRecipeQuery, GetRecipeQueryVariables, Recipe, useSaveCommentMutation } from 'generated/graphql';
import { getRecipeIdsQuery, getRecipeQuery } from 'graphql/recipe.resolver';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image'
import Tag from 'components/Tag';
import Icon from 'components/Icon';
import { ListItem } from 'components/ListItem';
import Checkbox from 'components/Checkbox';
import React, { useState } from 'react';
import { loadingAlert, showAlert } from 'helpers/show-alert';
import Tooltip from 'components/Tooltip';
import * as Yup from 'yup'
import Comment from 'components/Comment';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { FormikTextArea } from 'components/TextArea/FormikTextArea';
interface Props {
    recipe: Recipe
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const { id } = params!;
    const { data } = await client.query<GetRecipeQuery, GetRecipeQueryVariables>({
        query: getRecipeQuery,
        variables: {
            idRecipe: Number(id)
        }
    });
    return {
        props: {
            recipe: data.getRecipe as Recipe
        }
    }
}

const Recipe = ({ recipe }: Props) => {
    const { photo, tags, name, likes, user: { username }, dateCreated, description, ingredients, steps, comments, bookmarkedBy, idRecipe } = recipe;
    const [stepsChecked, setStepsChecked] = useState<boolean[]>([])
    const [commentsList, setCommentsList] = useState<CommentType[]>(comments)
    const [saveComment] = useSaveCommentMutation();

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const stepsCheck = [...stepsChecked];
        stepsCheck[index] = event.target.checked;
        setStepsChecked(stepsCheck);
        if (stepsCheck.filter(step => step === true).length === steps.length) {
            showAlert({
                title: 'Recipe completed!',
                text: 'Did you like it? Lave a comment and a like!',
                icon: 'success'
            });
        }
    }

    const onCommentSubmit = async ({ comment }: { comment: string }) => {
        const loading = loadingAlert();
        loading.showLoading();

        try {
            const { data } = await saveComment({
                variables: {
                    comment: {
                        comment,
                        idRecipe
                    }
                }
            });
            if (data?.saveComment) {
                const _comment = data.saveComment as CommentType;
                setCommentsList(prev => [_comment, ...prev])
                loading.hideLoading();
                showAlert({
                    title: 'Comment added successfully',
                    text: 'Your comment has been added!',
                    icon: 'success'
                });
            }

        } catch (err) {

        }
    }

    return (
        <div className={styles.recipe}>
            <div className={styles.info}>
                <span className={styles.frame}>
                    <Image src={photo} height={600} width={600} />
                </span>
                <span className={styles.title}>
                    <Heading variant='h1' fontWeight='bold'>{name}</Heading>
                    <Tooltip text='Bookmark'>
                        <Icon.BookmarkOutline />
                    </Tooltip>
                </span>
                <div className={styles.tags}>
                    {
                        tags.map(({ name }) => (
                            <Tag key={name} title={name} />
                        ))
                    }
                </div>
                <div className={styles.metadata}>
                    <span>
                        <Icon.ThumbUpOutline style={{ cursor: 'pointer' }} />
                        <p>{likes.length}</p>
                    </span>
                    <span>
                        <Icon.Calendar />
                        {dateCreated}
                    </span>
                    <b>{username}</b>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.ingredients}>
                    <Heading className="mb-sm" variant="h5" fontFamily='body' fontWeight='bold'>Ingredients</Heading>
                    {
                        ingredients.map(({ name, unit, quantity }, index) => (
                            <ListItem key={index} bullet bulletColor='primary' background={false}>
                                <span>{name} - <b>{quantity} {unit.name}</b></span>
                            </ListItem>
                        ))
                    }
                </div>
            </div>
            <div className={styles.steps}>
                <Heading className="mb-sm" variant="h5" fontFamily='body' fontWeight='bold'>Steps</Heading>
                {
                    steps.map(({ description }, index) => (
                        <Checkbox onChange={(e) => onCheckboxChange(e, index)} key={index} name={index.toString()} label={description} />
                    ))
                }
            </div>
            <div className={styles.comments}>
                <Heading className="mb-sm" variant="h5" fontFamily="body" fontWeight="bold">Comments</Heading>
                <div >
                    <Formik
                        initialValues={{
                            comment: ''
                        }}
                        validationSchema={Yup.object({
                            comment: Yup.string().required('El comentario no puede estar vacío')
                        })}
                        onSubmit={(values, { resetForm }) => {
                            onCommentSubmit(values);
                            resetForm();
                        }}>
                        {
                            formik => (
                                <Form className={styles.commentForm}>
                                    <FormikTextArea name="comment" placeholder="Leave a comment" />
                                    <Button type="submit" className="mt-sm">Comment</Button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className={styles.commentsBox}>
                    {
                        commentsList.map(({ idComment, comment, likes, user: { username, name, lastName } }) => (
                            <Comment key={idComment} idComment={idComment} likes={likes.length} name={`${name} ${lastName}`} username={username}>
                                {comment}
                            </Comment>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query<GetRecipeIdsQuery>({
        query: getRecipeIdsQuery
    });

    return {
        paths: data.getRecipes.map(({ idRecipe }) => ({
            params: {
                id: idRecipe.toString()
            }
        })),
        fallback: false
    }
}

export default Recipe
