import express, { Express } from 'express';
import connect from '../db';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';
import http from 'http';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { graphqlUploadExpress } from 'graphql-upload';

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
        app.use(graphqlUploadExpress());
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [
                    path.join(__dirname, '../schema/**/*.resolver{.ts,.js}')
                ]
            }),
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                ApolloServerPluginLandingPageGraphQLPlayground
            ],
            context: ({ req, res }) => ({ req, res, headers: req.headers })
        });
        await server.start();
        server.applyMiddleware({ app });
        await new Promise<void>(resolve => httpServer.listen({ port: this.port }, resolve));
        console.log(`Server ready at port ${this.port} 🦕`.blue);

    }
}