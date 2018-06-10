import User from "./User"

export interface IUsersDb {
    isUserExists(username:string):boolean,
    deleteUser(username:string):boolean,
    addUser(user:User):void,
    getUserNamesList():string[],
    getUser(userName:string):User,
    getUsers():User[]
}

class UsersDb implements IUsersDb{
    private users: User[];
    constructor(){
        this.users = [new User("Mohammed", 25, "mohammed"),new User("Ofer", 27, "ofer"), new User("Tommy", 27, "tommy"), new User("Roni", 40, "roni"), new User("Ori", 38, "ori"), new User("Udi", 34, "udi")];
    }

    private findUserIndex(username:string){
        return this.users.findIndex((user)=>{
            return username === user.name;
        })
    }

    public isUserExists(username:string){
        const i = this.findUserIndex(username);
        return (i !== -1);
    }

    public deleteUser(username:string){
        const i = this.findUserIndex(username);
        if(i !== -1){
            this.users.splice(i, 1);
            return true;
        }
        else{
            return false;
        }
    }

    public addUser(user:User){
        this.users.push(user);
    }
    public getUserNamesList(){
        return this.users.map((user)=>{
            return user.name
        })
    }

    public getUser(userName:string){
        const user = this.users.find((user)=>{
            return user.name === userName;
        });
        if(user){
            return user;
        }
        else{
            throw new Error("No user was Found");
        }
    }

    public getUsers(){
        return this.users;
    }

}

export const usersDb: IUsersDb = new UsersDb();