import { createConnection } from 'typeorm'
import path from 'path'

const connect = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                path.join(__dirname, '../schema/**/*.entity.ts')
            ],
            //synchronize: true
        });
        console.log('Database is connected ⚡'.blue);
    } catch (err) {
        console.log("Failed to connect to dabatabase: ".red, err);
    }
}
export default connect;