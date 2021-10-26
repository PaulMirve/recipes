import 'colors';
import Server from "./server";
import * as dotenv from 'dotenv';
dotenv.config();
console.clear();

const server = new Server();
async function main() {
    server.start();
}
main();