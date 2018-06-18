import * as React from 'react';
import './ListItems.css';
import {IMessage} from "../models/Message";

interface IListItems {
    className?:string,
    message:IMessage,
    loggedInUser: {name:string, id:string}|null
}

const ListItems = (props:IListItems) => {

        let className;
        if(props.className){
            className = props.className
        }
        return (
            <li key={props.message.id}  className="MessageLi">
                <div className={"message-text "+ className}>
                    <div className="UserName" hidden={props.message.sender!.id === props.loggedInUser!.id}>{props.message.sender ? props.message.sender.name : ""}</div>
                    {props.message.message}
                    <div className="DateOfMessage">{props.message.date}</div>
                </div>
            </li>
        );
};

export default ListItems;