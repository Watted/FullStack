import * as React from 'react';
import ListItems from "./ListItems";
import './ChatArea.css';
import {IMessage} from "../models/message";

interface IChatMessagesProps {
    messages:IMessage[]|undefined,
    selectedName:string|undefined,
    loggedInUser: {name:string, id:string}|null
}


const ChatArea = (props:IChatMessagesProps) =>{
    const ulWrapper = {
        width: '100%'
    };

        let messagesHistory;
        if(props.messages && props.loggedInUser){
             messagesHistory = props.messages.map((message, idx)=>{
                 if(props.loggedInUser){
                     if(message.sender!.id === props.loggedInUser.id){
                         return(<div key={idx} className='me-left'><ListItems loggedInUser={props.loggedInUser} className='me' message={message}/></div>)
                     }
                     else{
                         return (<div key={idx} className='others-right'><ListItems loggedInUser={props.loggedInUser} message={message}/></div>)
                     }
                 }
                 return;
            })
        }
        return (
            <div hidden={!props.selectedName || !props.loggedInUser} className='messages-wrapper'>
                <div>
                    <h1 className='messages-on'>{props.selectedName}</h1>
                 </div>
                <div style={ulWrapper}>
                    <ul>{messagesHistory}</ul>
                </div>
            </div>
        );
};

export default ChatArea;