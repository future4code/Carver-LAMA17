import { TestScheduler } from "jest";
import { UserBusiness } from "../src/business/UserBusiness";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratoMockr";
import { UserDataBaseMock } from "./mocks/UserDatabaseMock";


const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock(),
    new UserDataBaseMock() as any
)

describe("teste de signUp", () => {

    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions(2)
        
        try {
            await userBusinessMock.createUser("", "email@email.com", "123", "ADMIN")
        } catch (e: any) {
            expect(e.message).toEqual("Missing input")
            expect(e.statusCode).toBe(422)
        }
    })
})