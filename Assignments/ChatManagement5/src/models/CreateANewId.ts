
export class CreateANewId{
    static id =1;
    static createNewId() {
        return CreateANewId.id++;
    }
}