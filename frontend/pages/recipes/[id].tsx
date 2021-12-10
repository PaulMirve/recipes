import styles from '@sass/pages/recipe.module.scss';
import client from 'client';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Comment from 'components/Comment';
import Heading from 'components/Heading';
import Icon from 'components/Icon';
import { ListItem } from 'components/ListItem';
import Menu from 'components/Menu/ìndex';
import Tag from 'components/Tag';
import { FormikTextArea } from 'components/TextArea/FormikTextArea';
import Tooltip from 'components/Tooltip';
import { Form, Formik } from 'formik';
import { GetRecipeQuery, GetRecipeQueryVariables, Recipe } from 'generated/graphql';
import { getRecipeQuery } from 'graphql/recipe.resolver';
import { showAlert } from 'helpers/show-alert';
import { useBookmark } from 'hooks/useBookmark';
import { useComment } from 'hooks/useComment';
import { useGlobalContext } from 'hooks/useGlobalContext';
import { useLikes } from 'hooks/useLikes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import * as Yup from 'yup';
interface Props {
    recipe: Recipe
}

interface Params extends ParsedUrlQuery {
    id: string
}



const Recipe = ({ recipe }: Props) => {
    const { photo, tags, name, user: { username }, dateCreated, description, ingredients, steps, comments, idRecipe } = recipe;
    const [stepsChecked, setStepsChecked] = useState<boolean[]>([])
    const { commentsList, addComment } = useComment({ idRecipe, comments });
    const { onLikeRecipe, isRecipeLiked, likesCount } = useLikes(recipe)
    const { bookmarkRecipe, isRecipeBookmarked } = useBookmark(recipe);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const { user } = useGlobalContext();
    const router = useRouter();

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const stepsCheck = [...stepsChecked];
        stepsCheck[index] = event.target.checked;
        setStepsChecked(stepsCheck);
        if (stepsCheck.filter(step => step === true).length === steps.length) {
            showAlert({
                title: 'Recipe completed!',
                text: 'Did you like it? Leave a comment and a like!',
                icon: 'success'
            });
        }
    }

    const handleDelete = () => {
        showAlert({
            title: 'Delete recipe',
            text: 'Are you sure you want to delete this recipe?',
            icon: 'question',
            confirmButtonText: 'Yes, delete it.',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            cancelButtonText: 'No, cancel.',
            cancelButtonColor: '#d33',
        }, (result) => {
            if (result.isConfirmed) {
                showAlert({
                    title: 'Deleted!',
                    text: 'The recipe has been deleted successfully!',
                    icon: 'success'
                })
            }
        });
    }

    return (
        <div className={styles.recipe}>
            <Head>
                <title>ReciPies | {name}</title>
            </Head>
            <div className={styles.info}>
                <span className={styles.frame}>
                    <Image src={photo} height={600} width={600} alt='Selected photo' />
                    {isRecipeBookmarked ?
                        <Icon.BookmarkFilled className={styles.bookmarkIcon} onClick={bookmarkRecipe} />
                        :
                        <Icon.BookmarkOutline className={styles.bookmarkIcon} onClick={bookmarkRecipe} />}
                </span>
                <span className={styles.title}>
                    <span>
                        <Heading variant='h1' fontWeight='bold'>{name}</Heading>
                        {user?.username === username &&
                            <>
                                <span onClick={(e) => {
                                    setIsMenuOpen(true);
                                    setAnchorEl(e.currentTarget);
                                }}>
                                    <Icon.DotVertical />
                                </span>
                                <Menu onClose={() => setIsMenuOpen(false)} open={isMenuOpen} anchorEl={anchorEl}>
                                    <span onClick={() => router.push(`/recipes/update/${idRecipe}`)} className={styles.menuIcon}>
                                        <Icon.Edit />
                                        Edit
                                    </span>
                                    <span onClick={handleDelete} className={styles.menuIcon}>
                                        <Icon.Delete />
                                        Delete
                                    </span>
                                </Menu>
                            </>}
                    </span>
                    <Tooltip text='Bookmark'>
                        {isRecipeBookmarked ? <Icon.BookmarkFilled onClick={bookmarkRecipe} /> : <Icon.BookmarkOutline onClick={bookmarkRecipe} />}
                    </Tooltip>

                </span>
                <div className={styles.tags}>
                    {
                        tags.map(({ name }) => (
                            <Tag key={name} title={name} link />
                        ))
                    }
                </div>
                <div className={styles.metadata}>
                    <span>
                        {isRecipeLiked ?
                            <Icon.ThumbUpFilled style={{ cursor: 'pointer' }} onClick={onLikeRecipe} />
                            :
                            <Icon.ThumbUpOutline style={{ cursor: 'pointer' }} onClick={onLikeRecipe} />}
                        <p>{likesCount}</p>
                    </span>
                    <span>
                        <Icon.Calendar />
                        {dateCreated}
                    </span>
                    <Link href={`/user/${username}`}><a className={styles.username}><b>{username}</b></a></Link>
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
                            addComment(values);
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
                            <Comment key={idComment} idComment={idComment} likes={likes} name={`${name} ${lastName}`} username={username}>
                                {comment}
                            </Comment>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
    const { id } = params!;
    const recipe = await client.query<GetRecipeQuery, GetRecipeQueryVariables>({
        query: getRecipeQuery,
        variables: {
            idRecipe: Number(id)
        },
        fetchPolicy: 'no-cache'
    })
        .then(res => res.data.getRecipe as Recipe)
        .catch(err => null);

    if (!recipe) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            }
        }
    }

    return {
        props: {
            recipe
        }
    }
}

export default Recipe
