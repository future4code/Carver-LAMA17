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

describe("teste", () => {
    test("Sucesso no cadastro e verificação do token de acesso", async () => {
        expect.assertions
        try {
    const accessToken = await userBusinessMock.createUser("astrodev", "astrodev@gmail.com", "astrodev123", "ADMIN")
            expect(accessToken).toEqual({"accessToken": "token_mockado"})
        } catch (error: any) {
            console.log(error)
        }
    })
})