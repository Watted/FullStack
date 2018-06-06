import IChat from "../Interface/IChat.js";

class Group implements IChat{
    constructor(private nameOfGroup:string,private item:IChat[]) {
    }


    getName() {
        return this.nameOfGroup;
    }

    getItems(): IChat[] {
        return this.item;
    }

    getType(): string {
        return "group";
    }

}
export default Group;