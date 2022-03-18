import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import { User, stringToUserRole } from "../model/User";



export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase
    ) {

    }
    public async createUser(
        name: string,
        email: string,
        password: string,
        role: string

    ) {
        try {
            if (!name || !email || !password || !role) {
                throw new BaseError(422, "Missing input");
            }

            if (email.indexOf("@") === -1) {
                throw new BaseError(422, "Invalid email");
            }

            if (password.length < 6) {
                throw new BaseError(422, "Invalid password");
            }

            const id = this.idGenerator.generate();

            const cypherPassword = await this.hashManager.hash(password);
            await this.userDatabase.createUser(
                new User(id, name, email, cypherPassword, stringToUserRole(role))
            );

            const accessToken = this.authenticator.generateToken({
                id,
                role,
            });
            return { accessToken };
        } catch (error:any) {
          if(error instanceof BaseError){
            if (error.message.includes("key 'email'")) {
                throw new BaseError(409, "Email already in use")
            }

            throw new BaseError(409, error.message)
        }
        }
    }


    public async login(email: string, password: string) {

        try {
            if (!email || !password) {
                throw new BaseError(422, "Missing input");
            }
            const user = await this.userDatabase.getUserByEmail(email);

            if (!user) {
                throw new BaseError(401, "Invalid credentials");
            }

            const isPasswordCorrect = await this.hashManager.compare(
                password,
                user.getPassword()
            );

            if (!isPasswordCorrect) {
                throw new BaseError(401, "Invalid credentials");
            }

            const accessToken = this.authenticator.generateToken({
                id: user.getId(),
                role: user.getRole(),
            });

            return { accessToken };
        } catch (error: any) {
            throw new BaseError(error.statusCode, error.message)
        }
    }
}

export default new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDatabase()
)