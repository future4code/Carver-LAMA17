export class User{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES
    ){}

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name
    }

    public getEmail(){
        return this.email;
    }

    public getPassword(){
        return this.password;
    }

    public getRole(){
        return this.role;
    }

    public setId(id: string){
        this.id = id;
    }

    public setName(name: string){
        this.name = name;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public setPassword(password: string){
        this.password = password;
    }

    public setRole(role: USER_ROLES){
        this.role = role;
    }
}    

   export const stringToUserRole = (input: string): USER_ROLES => {
        switch (input) {
            case "NORMAL":
              return USER_ROLES.NORMAL;
            case "ADMIN":
              return USER_ROLES.ADMIN;
            default:
              throw new Error("Invalid user role");
          }
    }

    export const toUserModel = (user: any): User => {
        return new User(user.id, user.name, user.email, user.password, user.role);
      }




export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum USER_ROLES{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}