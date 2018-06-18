import Group from './Group';
import IUser from "./User";
import {usersDb} from "./Users";

export default class TreeChat{
    public root:Group;
    constructor(){
        this.root = new Group(this.root, "treeRoot", []);
    }

    public add(node:Group| IUser, parentNode?:Group){
        this.root.add(node, parentNode);
    }
    public search(nodeId:string|undefined){
        return this.root.search(nodeId)
    }


    public printFullTree(){
        return this.root.printFullTree();
    }

}

export const tree:TreeChat = new TreeChat();

const friends = new Group(tree.root, "Friends", []);
const bestFriends = new Group(friends, "Best Friends", []);
const goodFriends = new Group(tree.root, "Good Friends", []);

tree.add(friends);
tree.add(bestFriends, friends);
tree.add(goodFriends);
tree.add(usersDb.getUser('Tommy'), bestFriends);
tree.add(usersDb.getUser('Udi'), bestFriends);
tree.add(usersDb.getUser('Ori'));
tree.add(usersDb.getUser('Roni'));
tree.add(usersDb.getUser('Mohammed'),goodFriends);
tree.add(usersDb.getUser('Ofer'),goodFriends);
