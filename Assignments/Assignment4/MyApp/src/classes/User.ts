import IChat from "../Interface/IChat.js";

export class User implements IChat{
    constructor(private username:string, private password:string, private age:string) {
        //private property
    }

    getName() {
        return this.username;
    }

    getPassword(){
        return this.password;
    }

    getAge() {
        return this.age;
    }

    getItems(): IChat[] {
        return [];
    }

    getType(): string {
        return "user";
    }
}

export default User;




