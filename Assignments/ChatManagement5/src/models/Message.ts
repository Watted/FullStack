import {CreateANewId} from './CreateANewId';

export interface IMessage{
    message:string,
    date?:string,
    sender?:{name:string, id:string},
    id?:string
}

export class Message implements IMessage{
    public message:string;
    public date?:string;
    public id:string;

    constructor(message:string, date:string){
        this.id = CreateANewId.createNewId().toString();
        this.message = message;
        this.date = date;
    }
}