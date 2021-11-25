import { JwtPayload } from "jsonwebtoken";
import { Connection } from "typeorm";
import validateJWT from '../helpers/validate-jwt';
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
    it("create a user", async () => {
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
    test('login', async () => {
        const loginMutation = `
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              user {
                name
                lastName
                username
                role {
                  name
                }
              }
              jwt
            }
          }`

        const { data } = await graphCall({
            source: loginMutation,
            variableValues: {
                username: 'tester',
                password: 'password'
            }
        })

        expect(data.login.user).toMatchObject({
            name: 'Test',
            lastName: 'Tester',
            username: 'tester',
            role: {
                name: 'USER_ROLE'
            }
        });

        expect((validateJWT(data.login.jwt) as JwtPayload).username).toBe("tester");

    })

})
