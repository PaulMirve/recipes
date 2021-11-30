import client from 'client'
import { GetUnitsQuery, Unit } from 'generated/graphql'
import { getUnits } from 'graphql/unit.resolver'
import RecipeForm from 'layout/RecipeForm'
import { GetStaticProps } from 'next'
interface Props {
    units: Unit[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data } = await client.query<GetUnitsQuery>({
        query: getUnits
    });
    return {
        props: {
            units: data.getUnits
        }
    }
}

const AddRecipe = ({ units }: Props) => {
    return (
        <RecipeForm units={units} />
    )
}

export default AddRecipe
