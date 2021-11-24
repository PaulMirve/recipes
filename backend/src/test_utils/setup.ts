import { RoleEntity } from "../schema/role/role.entity";
import { createTestConnection } from "./testConnection";

createTestConnection(true).then(async (connection) => {
    await connection.createQueryBuilder().insert().into(RoleEntity).values([
        {
            name: 'USER_ROLE'
        }, {
            name: 'ADMIN_ROLE'
        }
    ]).execute();
    process.exit()
});