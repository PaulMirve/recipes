import styles from '@sass/pages/recipe.module.scss';
import client from 'client';
import Heading from 'components/Heading';
import { GetRecipeIdsQuery, GetRecipeQuery, GetRecipeQueryVariables, Recipe } from 'generated/graphql';
import { getRecipeIdsQuery, getRecipeQuery } from 'graphql/recipe.resolver';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image'
import Tag from 'components/Tag';
import Icon from 'components/Icon';
import { ListItem } from 'components/ListItem';
import Checkbox from 'components/Checkbox';
import React, { useState } from 'react';
import { showAlert } from 'helpers/show-alert';
import Tooltip from 'components/Tooltip';
import { TextArea } from 'components/TextArea';
import Comment from 'components/Comment';
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
    const { photo, tags, name, likes, user: { username }, dateCreated, description, ingredients, steps } = recipe;
    const [stepsChecked, setStepsChecked] = useState<boolean[]>([])

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
                <TextArea name="comment" placeholder="Leave a comment" />
                <div className={styles.commentsBox}>
                    <Comment likes={2} username="Paul Miranda">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos est maxime inventore delectus quaerat veritatis, dolor praesentium autem doloremque illo aliquam, sit dolore odio minima placeat assumenda? Nostrum, provident fuga.
                    </Comment>
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
