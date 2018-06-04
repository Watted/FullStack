import * as moment from 'moment'
import Group from './../classes/Group'
import User from './../classes/User'
import Messages from '../classes/Messages'
import IChat from "../Interface/IChat.js";

export class DB {
    static Messages = [
        new Messages("hey", 'Mohammed', 'Udi', moment().format('h:mm:ss')),
        new Messages("How are You?", 'Udi', 'Mohammed', moment().format('h:mm:ss')),
        new Messages("I'm fine", 'Mohammed', 'Udi', moment().format('h:mm:ss')),
        new Messages("bye!", 'Udi', 'Mohammed', moment().format('h:mm:ss')),
        new Messages("bye!", 'Udi', 'Friends', moment().format('h:mm:ss')),

    ];

    static Users = [
        new User('Mohammed', 'mohammed', '25' ),
        new User('Udi', 'udi', '27' ),
        new User('Ofer', 'ofer', '31' ),
        new User('Roni', 'roni', '30' ),
        new User('Ori', 'ori', '36' ),
        new User('Tommy', 'tommy', '26' ),
    ];


    static Groups = DB.initGroups();

    static initGroups() :  Group[]{
        let tmpGroup = [
            new Group('Friends',
                      [
                            new Group('Best Friends',
                                      [
                                            new Group(
                                                'Good Friends',
                                                [DB.Users[3],
                                                          DB.Users[4]]),
                                          DB.Users[5],
                                          DB.Users[6]]),
                            DB.Users[0],
                            DB.Users[1],
                            DB.Users[2]])
                ];
        return tmpGroup;
    }

    static Data = DB.initData();

    static initData(){
        let data : IChat[] = [];
        data = data.concat(DB.GetGroups());
        data = data.concat(DB.GetUsers());
        return data;
    }


    static GetMessages(sender :IChat, reciver : IChat) : Messages[]{
        let resMessages : Messages[] = [];
        if(reciver.getType() === 'group'){
            for (let i: number = 0; i < DB.Messages.length; i++) {
                if (DB.Messages[i].getReciveUser() === reciver.getName())
                    resMessages.push(DB.Messages[i]);
            }
        }
        else {
            for (let i: number = 0; i < DB.Messages.length; i++) {
                if (DB.Messages[i].getSenderUser() === sender.getName() && DB.Messages[i].getReciveUser() === reciver.getName() ||
                    DB.Messages[i].getSenderUser() === reciver.getName() && DB.Messages[i].getReciveUser() === sender.getName())
                    resMessages.push(DB.Messages[i]);
            }
        }
        return resMessages;
    }

    static SetMessage(m : Messages){
        if(! DB.Messages)
            DB.Messages = [];
        this.Messages.push(m);
    }


    static  GetUsers() : User[] {
        if(! this.Users)
            return [];
        else
            return this.Users;
    }

    static GetSpecificUser(userLogin : string, passwordLogin : string){
        for(let item of DB.Users){
            if(item.getName() === userLogin && item.getPassword() === passwordLogin)
                return item;
        }
        return null;
    }

    static GetGroups() : Group[]{
        if(! DB.Groups)
            return [];
        else
            return DB.Groups;
    }


    static GetData() : IChat[]{
        if(! DB.Data)
            return [];
        else
            return DB.Data;
    }
}

