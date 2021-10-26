import { createConnection } from 'typeorm'
import path from 'path'

const connect = async () => {
    try {
        await createConnection({
            type: 'postgres',
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                path.join(__dirname, '../schema/**/*.entity.ts')
            ]
        });
        console.log('Database is Connected ⚡'.blue);
    } catch (err) {
        console.log("Failed to connect to dabatabase: ".red, err);
    }
}
export default connect;