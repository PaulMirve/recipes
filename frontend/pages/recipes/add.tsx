
import styles from '@sass/pages/add-recipe.module.scss';
import axios from 'axios';
import RecipeForm, { RecipeFormSubmitArgs } from 'layout/RecipeForm';
import { useRouter } from 'next/dist/client/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Head from 'next/head'

const MySwal = withReactContent(Swal);

const AddRecipe = () => {
    const router = useRouter();

    const onFormSubmit = async ({ name, description, people, photo, photoFile, steps, ingredients, tags }: RecipeFormSubmitArgs) => {
        Swal.fire({
            title: 'Loading...',
            customClass: {
                popup: styles.alert
            },
            allowOutsideClick: false
        });
        Swal.showLoading();
        const errors = [];
        if (!photo) {
            errors.push('The recipe needs a photo.');
        }
        if (steps.length === 0) {
            errors.push('The recipe needs one or more steps.');
        }
        if (ingredients.length === 0) {
            errors.push('The recipe needs one or more ingredients.');
        }
        if (tags.length === 0) {
            errors.push('The recipe needs one or more tags.');
        }

        if (errors.length === 0) {
            let formData = new FormData();
            formData.append("operations", `
            {
                "query": "mutation ($recipe: RecipeInput!) {saveRecipe(recipe: $recipe){name} }",
                "variables": {
                    "recipe": {
                        "name": "${name}",
                        "description": "${description}",
                        "photo": null,
                        "numberOfPeople": ${people},
                        "ingredients": [${ingredients.map(({ name, quantity, unit: { idUnit } }) => JSON.stringify({ name, quantity: Number(quantity), idUnit: Number(idUnit) }))}],
                        "steps": [${steps.map(({ description }) => JSON.stringify({ description }))}],
                        "tags": [${tags.map((tag) => JSON.stringify({ name: tag, idRecipe: 0 }))}]
                    }
                }
            }
            `);
            formData.append("map", `{ "0": ["variables.recipe.photo"] }`);
            formData.append("0", photoFile!);
            try {
                await axios.post('http://localhost:8081/graphql', formData, {
                    headers: {
                        authorization: localStorage.getItem('token') || ""
                    }
                });
                Swal.hideLoading();
                MySwal.fire({
                    title: 'Recipe added successfully!',
                    text: 'The recipe has been added successfully, please press continue to see the recipes.',
                    icon: 'success',
                    allowOutsideClick: false,
                    customClass: {
                        popup: styles.alert
                    },
                    confirmButtonText: 'Continue'
                }).then(result => {
                    if (result.isConfirmed) {
                        router.push('/recipes');
                    }
                })
            } catch (err) {
                Swal.hideLoading();
                alert(err);
            }

        } else {
            Swal.hideLoading();
            MySwal.fire({
                title: 'Recipe incomplete!',
                html: (
                    <span>
                        <h4 style={{ marginBottom: '1rem' }}>The information of the recipe is incomplete:</h4>
                        <ul>
                            {
                                errors.map(error => (
                                    <li className={styles.errors}>{error}</li>
                                ))
                            }
                        </ul>
                    </span>
                ),
                icon: 'error',
                allowOutsideClick: false,
                customClass: {
                    popup: styles.alert
                },
                confirmButtonText: 'Accept'
            })
        }
    }

    return (
        <>
            <Head>
                <title>ReciPies | Add recipe</title>
            </Head>
            <RecipeForm onFormSubmit={onFormSubmit} />
        </>

    )
}

export default AddRecipe
