import * as React from 'react';
import {ERROR_MSG} from "../containers/App";
import {IMessage} from "../models/message";
import './FooterArea.css';
interface IFooterAreaProps {
    data: {
        loggedInUser: {name:string, id:string} | null,
        errorMsg: ERROR_MSG,
        redirect:boolean
    },
    selectedName:string|undefined,
    message:IMessage,
    handleChange(event: any):void,
    keyDownListener(event:any):void,
    onClickSend(event:React.MouseEvent<HTMLButtonElement>):void
}


const FooterArea = (props:IFooterAreaProps) => {
        return (
            <div className='container'>
                <div className='TextAreaWrapper'><textarea className='MessageTextArea' value={props.message['message']} disabled={!props.data.loggedInUser || !props.selectedName} onKeyDown={props.keyDownListener} onChange={props.handleChange} placeholder="Type Here..."/></div>
                <div className='btnWrapper'>
                    <button disabled={!props.data.loggedInUser} className='btnSend' onClick={props.onClickSend}>Send</button>
                </div>
            </div>
        );

};

export default FooterArea;