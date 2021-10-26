import express, { Express } from 'express';
import connect from '../db';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';
import http from 'http';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';

export default class Server {
    app: Express;
    port: number;

    constructor() {
        this.app = express();
        this.dbConnect();
        this.port = 8081;
    }

    async dbConnect() {
        await connect();
    }


    async startApolloServer() {
    }

    async start() {
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [
                    path.join(__dirname, '../schema/**/*.resolver.ts')
                ]
            }),
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                ApolloServerPluginLandingPageGraphQLPlayground
            ],
            context: ({ req }) => ({ headers: req.headers })
        });
        await server.start();
        server.applyMiddleware({ app });
        await new Promise<void>(resolve => httpServer.listen({ port: this.port }, resolve));
        console.log(`Server ready at http://localhost:${this.port}${server.graphqlPath} 🦕`.blue);

    }
}