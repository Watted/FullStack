import * as React from 'react';
import Left from "./Left";
import ChatArea from "../components/ChatArea";
import FooterArea from "../components/FooterArea";
import './chat.css';
import {ERROR_MSG} from "./App";
import {stateStoreService} from "../state/StateStore";
import {IMessage} from "../models/message";
import {Message} from '../models/message';

interface IChatState {
    selectedName? : string,
    selectedId?:string,
    selectedType?:string,
    message:IMessage,
    selectedMassages?:IMessage[],
}

interface IChatProps {
    data:{
        loggedInUser: {name:string, id:string} | null,
        errorMsg: ERROR_MSG,
        counter: number,
        redirect:boolean
    }
}



class Chat extends React.Component<IChatProps, IChatState> {
    constructor(props:IChatProps) {
        super(props);
            this.state = {message:{message:''}};
    }

    public logOut = () => {
        this.setState({selectedId:"", selectedType:"", selectedName:""})
    };

    public getSelected = (eventTarget:any) => {
        if(this.props.data.loggedInUser) {
            if (eventTarget.tagName !== 'UL' && eventTarget.tagName !== 'LI') {
                if(eventTarget.type === 'group'){
                    if(stateStoreService.isUserExistInGroup(eventTarget.id, this.props.data.loggedInUser.id)){
                        this.setStateOnSelected(eventTarget);
                    }
                }
                else{
                    this.setStateOnSelected(eventTarget);
                }
            }
        }
        else{
            alert("You need to login first.")
        }
    };

    private setStateOnSelected = (eventTarget:any) => {
        this.setState({
            selectedName: eventTarget.innerHTML.substr(0),
            selectedId: eventTarget.id,
            selectedType:eventTarget.type
        }, () => {
            this.getSelectedMessageHistory();
        });
    };

    private getSelectedMessageHistory = () => {
        if(this.state.selectedId && this.props.data.loggedInUser){
            const messagesList:IMessage[] = stateStoreService.getSelectedMessagesHistory(this.state.selectedType, this.state.selectedId, this.props.data.loggedInUser.id);
            this.setState({selectedMassages:messagesList, message:{message:""}});
        }
    };

    public handleChange = (event: any):void => {
        this.setState({message : {message: event.target.value}});
    };

    public keyDownListener = (event:any) => {
        if(this.props.data.loggedInUser && this.state.selectedName && this.state.message.message.trimLeft().length){
            if(event.keyCode == 10 || event.keyCode == 13){
                event.preventDefault();
                this.addMessage();
            }
        }
    };

    public onClickSend = (event:React.MouseEvent<HTMLButtonElement>) => {
        if(this.props.data.loggedInUser && this.state.selectedName){
            this.addMessage();
        }
    };

    public addMessage = ()=>{
        this.setState({message : new Message(this.state.message.message, new Date().toLocaleString().slice(0, -3))}, ()=>{
            stateStoreService.addMessage(this.state.selectedType, this.state.selectedId, this.state.message, this.props.data.loggedInUser);
            this.getSelectedMessageHistory();
        });
    };


    public render() {
        return (
            <div className="chat">
                <div className="chat-left">
                    <Left getSelected={this.getSelected}/>
                </div>
                <div className="chat-right">
                    <div className="massages">
                        <ChatArea loggedInUser={this.props.data.loggedInUser} selectedName={this.state.selectedName} messages={this.state.selectedMassages}/>
                    </div>
                    <div className="massage-text-area">
                        <FooterArea onClickSend={this.onClickSend} message={this.state.message} selectedName={this.state.selectedName} data={this.props.data} handleChange={this.handleChange} keyDownListener={this.keyDownListener}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;