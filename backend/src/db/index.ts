import { createConnection } from 'typeorm'
import path from 'path'

const connect = async () => {
    try {
        await createConnection({
            type: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'recipees',
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