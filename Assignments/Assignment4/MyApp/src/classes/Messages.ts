class Messages{
    constructor(private Content: string, private SenderUser: string, private ReciveUser: string, private TimeSent: string){
    }

    getContent(){
        return this.Content;
    }

    getSenderUser(){
        return this.SenderUser;
    }

    getReciveUser(){
        return this.ReciveUser;
    }

    getTimeSent(){
        return this.TimeSent;
    }
}

export default Messages;

