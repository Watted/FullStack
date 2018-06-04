import {DB} from "../dataBase/DB";
import User from "../classes/User";
import Group from "../classes/Group";
import IChat from "../Interface/IChat.js";


interface IStateStore {
    state: {};
    set(key: string, val: any): void
    get(key: string): any | null
    subscribe(listener :any) : void
    onStoreChanged() : void
}

export class StateStore implements IStateStore {
    listeners: Function[];
    static instance: IStateStore;

    Users : User[];
    Groups : Group[];
    Data : IChat[];
    currentUser : User;
    Reciver : IChat;
    HoldReciver : IChat;
    LogOutState : boolean;

    state: {} = {
        Users : DB.GetUsers(),
        Groups : DB.GetGroups(),
        Data : DB.GetData(),
        currentUser : null,
        Reciver : null,
        HoldReciver : null,
        LogOutState : false,
    };

    constructor(){
        this.listeners = [];
    }

    set(key: string, val: any) {
        this.state[key] = val;
        this.onStoreChanged();
    }

    get(key: string) {
        return this.state[key] || null;
    }

    subscribe(listener :any){
        this.listeners.push(listener);
    }

    public onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }

    static getInstance() {
        if (!StateStore.instance)
            StateStore.instance = new StateStore();
        return StateStore.instance;
    }
}

export default StateStore;