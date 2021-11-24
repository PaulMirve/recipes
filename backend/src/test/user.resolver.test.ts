import { Connection } from "typeorm";
import { RoleEntity } from "../schema/role/role.entity";
import { graphCall } from "../test_utils/graphCall";
import { createTestConnection } from "../test_utils/testConnection";

let connection: Connection;

beforeAll(async () => {
    connection = await createTestConnection();
});

afterAll(async () => {
    await connection.close();
});

describe('Tests for User Resolver', () => {
    const saveUserMutation = `
    mutation SaveUser($user:UserInput!){
        saveUser(user: $user){
          name
          lastName
          username
          role{
            name
          }
        }
      }
    `
    it("create a user", async () => {
        const response = await graphCall({
            source: saveUserMutation,
            variableValues: {
                user: {
                    name: 'Test',
                    lastName: 'Tester',
                    username: 'tester',
                    password: 'password'
                }
            }
        })

        expect(response).toMatchObject({
            data: {
                saveUser: {
                    name: 'Test',
                    lastName: 'Tester',
                    username: 'tester',
                    role: {
                        name: 'USER_ROLE'
                    }
                }
            }
        });
    })
})
