import { graphql, GraphQLSchema } from "graphql"
import { buildSchema } from "type-graphql";
import path from 'path';

interface Options {
    source: string,
    variableValues?: { [key: string]: any }
}

let schema: GraphQLSchema;

export const graphCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await buildSchema({
            resolvers: [
                path.join(__dirname, '../schema/**/*.resolver{.ts,.js}')
            ]
        })
    }
    return graphql({
        schema,
        source,
        variableValues
    });
}