import 'colors';
import Server from "./server";
console.clear();

const server = new Server();
async function main() {
    server.start();
}
main();