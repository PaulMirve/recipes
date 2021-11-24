import { createConnection } from "typeorm";
import path from 'path'

export const createTestConnection = (drop: boolean = false) => {
    return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'recipes-test',
        entities: [
            path.join(__dirname, '../schema/**/*.entity{.ts,.js}')
        ],
        synchronize: drop,
        dropSchema: drop
    });
}