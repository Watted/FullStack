interface IChat {
    getType():string;
    getName(): string
    getItems(): IChat[]
}

export default IChat;