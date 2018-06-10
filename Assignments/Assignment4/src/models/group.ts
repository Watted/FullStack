import User from './User';;
import {IMessage} from "./Message";
import {CreateANewId} from './CreateANewId';

let i = 0;

export default interface IGroup{
    parent : IGroup,
    name : string,
    children : any[],
    id:string;
    others?:IGroup,
    messages:IMessage[],
    type:string;
    getParents() : IGroup[],
    isNodeExistInGroup(nodeId:string):boolean,
    add(node:IGroup| User, parentNode?:IGroup):void,
    search(nodeId:string|undefined): User|IGroup,
    removeGroup(node:IGroup):boolean,
    printFullTree():any[],
    getGroupsList():IGroup[]
}

export default class Group implements IGroup {
    public array: any[] = [];
    public id: string;
    public parent: IGroup;
    public name: string;
    public children: any[];
    public messages: IMessage[];
    public type: string;

    constructor(parent: IGroup, name: string, children: IGroup[] | User[]) {
        this.parent = parent;
        this.name = name;
        this.children = this.array.concat(children || []);
        this.messages = [];
        this.id = CreateANewId.createNewId().toString();
        this.type = 'group';
    }


    public walkAllChildrenAndGetParent(node: IGroup, parent: IGroup) {
        const childrenParent: any[] = [];
        if (node.children) {
            node.children.forEach((child) => {
                if (child instanceof User) {
                    childrenParent.push({"user": child, "parent": node});
                }
                if ((child as IGroup).children) {
                    childrenParent.push(...this.walkAllChildrenAndGetParent(child, node));
                }
            });
        }
        return childrenParent;
    }


    public walkChildren(node: any) {
        let allChildren = 0;
        if (node.children) {
            node.children.forEach((child: any) => {
                if (child instanceof User) {
                    allChildren += 1;
                }
                if (child.children) {
                    allChildren += this.walkChildren(child);
                }
            });
        }
        return allChildren;
    }

    public printFullTree() {
        return [...this.walkTree(this)]
    }

    public walkTree(node: IGroup) {
        const allTree: any[] = [];
        if (node.children) {
            node.children.forEach((child) => {
                const node = this.getDetails(child);
                allTree.push(node);
                if (child.children) {
                    this.walkTree(child)
                }
            });
            return allTree;
        }
        return allTree;
    }

    public getDetails(child: User | IGroup) {
        if (child instanceof Group) {
            const children: any[] = child.children.map((child) => {
                return this.getDetails(child);
            });
            return {
                id: child.id,
                type: child.type,
                name: child.name,
                items: children
            }
        }
        else {
            return {
                id: child.id,
                type: child.type,
                name: child.name,
            }
        }
    }

    public removeGroup(node: IGroup) {
        const parent: IGroup = node.parent;
        const groupIndex: number = parent.children.findIndex((child) => {
            return child.name === node.name;
        });
        if (groupIndex !== -1) {
            parent.children.splice(groupIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }

    public addNodeToSelectedGroup(parentGroup: IGroup, newNode: IGroup | User) {
        const parentGroupChildren: IGroup[] | User[] = parentGroup.children;
        if (parentGroupChildren.length) {
            const groupFirstChild: IGroup | User = parentGroupChildren[0];
            if (groupFirstChild instanceof Group) {
                return this.addNodeToSelectedGroupWhenGroupChildrenAreGroups(parentGroupChildren, newNode, parentGroup);
            }
            else {
                return this.addNodeToSelectedGroupWhenGroupChildrenAreUsers(parentGroupChildren, newNode, parentGroup)
            }
        }
        else {
            return this.addNodeToSelectedGroupWhenGroupHasNoChildren(parentGroupChildren, newNode, parentGroup);
        }
    }

    public addNodeToSelectedGroupWhenGroupChildrenAreGroups(parentGroupChildren: IGroup[] | User[], newNode: IGroup | User, parentGroup: IGroup) {
        if (newNode instanceof Group) {
            (parentGroupChildren as IGroup[]).push(newNode);
            newNode.parent = parentGroup;
            return true;
        }
        else {
            return this.checkForOthersGroup(parentGroupChildren, newNode, parentGroup);
        }
    }

    public checkForOthersGroup(groupChildren: IGroup[] | User[], newNode: User | IGroup, parentGroup: IGroup) {
        const groupOthers = parentGroup.others;
        if (groupOthers) {
            if ((groupOthers as IGroup).isNodeExistInGroup(newNode.id)) {
                return false;
            }
            else {
                groupOthers.children.push(newNode);
                (newNode as User).parents.push(groupOthers);
                return true;
            }
        }
        else {
            parentGroup.others = new Group(parentGroup, "others" + ++i, [newNode as User]);
            (groupChildren as IGroup[]).push(parentGroup.others);
            (newNode as User).parents.push(parentGroup.others);
            return true;
        }
    }


    public addNodeToSelectedGroupWhenGroupChildrenAreUsers(parentGroupChildren: User[] | IGroup[], newNode: IGroup | User, parentGroup: IGroup) {
        if (newNode instanceof User) {
            (parentGroupChildren as User[]).push(newNode);
            newNode.parents.push(parentGroup);
        }
        else {
            parentGroup.others = new Group(parentGroup, "others" + ++i, parentGroupChildren);
            parentGroupChildren.length = 0;
            (parentGroupChildren as IGroup[]).push(parentGroup.others, newNode as IGroup);
            (newNode as IGroup).parent = parentGroup;

            parentGroup.others.children.forEach((child) => {
                child.removeParent(parentGroup);
                child.parents.push(parentGroup.others);
            });
        }
        return true;
    }

    public addNodeToSelectedGroupWhenGroupHasNoChildren(parentGroupChildren: IGroup[] | User[], newNode: IGroup | User, parentGroup: IGroup) {
        (parentGroupChildren as any[]).push(newNode);
        if (newNode instanceof Group) {
            newNode.parent = parentGroup;
        }
        else {
            (newNode as User).parents.push(parentGroup);
        }
        return true;
    }

    public add(node: IGroup | User, parentNode: IGroup) {
        if (parentNode) {
            this.addNodeToSelectedGroup(parentNode, node);
        }
        else {
            this.addNodeToSelectedGroup(this, node);
        }
    }


    public search(nodeId: string) {
        return this.internalSearchAll(this, nodeId);
    }

    public internalSearchAll(node: IGroup, nodeId: string): any {
        let result;
        if (node.children) {
            node.children.some((child) => {
                if (child.id === nodeId) {
                    result = child;
                    return true;
                }
                if (child.children) {
                    result = this.internalSearchAll(child, nodeId);
                    if (result) {
                        return true;
                    }
                }
                return false;
            });
        }
        return result;
    }


    public getParents() {
        const parents: IGroup[] = [this];
        if (this.parent) {
            parents.unshift(...this.parent.getParents());
        }
        return parents;
    }

    public isNodeExistInGroup(nodeId: string) {
        const nodeIndex = this.children.findIndex((child: IGroup | User) => {
            return child.id === nodeId;
        });
        return nodeIndex !== -1;
    }

    public getGroupsList() {
        return this.internalSearchAllGroups(this)
    }

    public internalSearchAllGroups(node: IGroup) {
        const results: IGroup[] = [];
        if (node.children) {
            node.children.forEach((child) => {
                if (child instanceof Group) {
                    results.push(child);
                }
                if (child.children) {
                    results.push(...this.internalSearchAllGroups(child));
                }
            });
        }
        return results;
    }

}