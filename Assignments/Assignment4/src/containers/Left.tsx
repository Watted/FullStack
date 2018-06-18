import * as React from 'react';
import './Left.css'
import {stateStoreService} from "../state/StateStore";

const items = JSON.parse(stateStoreService.walkTree());

interface listItem{
    items: object[],
    name:string,
    type:string,
    id:string
}

interface ILeftTreeProps {
    getSelected(eventTarget:any):void
}

interface ILeftTreeState {
    selectedName : {}
}

class Left extends React.Component<ILeftTreeProps, ILeftTreeState> {
    constructor(props:ILeftTreeProps){
        super(props);
        this.state = {
            selectedName : {}
        }
    }

    public load =  ()=>{
        return this.loadItems(items, 0);
    };

    public keyUp = (e:React.KeyboardEvent<HTMLElement>)=>{
        const keyName = e.key;
        if(e.target){
            if((e.target as HTMLElement).className === "left tree"){
                ((e.target as HTMLElement).children[0].querySelector(":scope > a") as HTMLElement).focus();
            }
            else if(keyName === "ArrowRight"){
                this.arrowRight((e.target as HTMLElement));
            }
            else if((keyName === "ArrowLeft")){
                this.arrowLeft((e.target as HTMLElement));
            }
            else if(keyName === "ArrowDown" || keyName === "ArrowUp"){
                this.arrowUpOrDown((e.target as HTMLElement), keyName, e);
            }
            else if(keyName === "Enter"){
                this.enter((e.target as HTMLElement))
            }
        }
    };

    public enter = (element:HTMLElement) => {
        if(element.nextElementSibling){
            this.toggleDisplay((element.nextElementSibling as HTMLElement));
        }
    };

    public arrowUpOrDown = (element:HTMLElement, keyName:string, e:any)=>{
        const selectedLi = element.parentElement;
        const allLi = document.querySelectorAll("li");

        function getDisplayedLi(){
            const result:HTMLLIElement[] = [];
            for(let i = 0; i < allLi.length; i++){
                if(allLi[i].offsetParent){
                    result.push(allLi[i]);
                }
            }
            return result;
        }
        const displayedLi = getDisplayedLi();
        function findIndex (){
            let result;
            for(let i = 0; i < displayedLi.length; i++){
                if(displayedLi[i] === selectedLi){
                    result = i;
                }
            }
            return result;
        }
        const index = findIndex();
        if(index !== undefined && index !== -1) {
            let next: HTMLElement;
            if (keyName === "ArrowDown") {
                const nextLi = index + 1;
                if (nextLi < displayedLi.length) {
                    next = (displayedLi[nextLi].querySelector(":scope>a") as HTMLElement);
                    this.goToNext(next);
                }
            }
            else if (keyName === "ArrowUp") {
                const nextLi = index - 1;
                if (nextLi >= 0) {
                    next = (displayedLi[nextLi].querySelector(":scope>a") as HTMLElement);
                    this.goToNext(next);
                }
            }
        }
    };

    public goToNext = (next:HTMLElement)=>{
        if (next) {
            next.focus();
            this.props.getSelected(next);
        }
    };

    public arrowRight = (element:HTMLElement)=>{
        if(element.nextElementSibling){
            (element.nextElementSibling as HTMLElement).style.display = "block";
            (element.nextElementSibling as HTMLElement).focus();
        }
    };

    public arrowLeft = (element:HTMLElement)=>{
        if(element.parentElement && element.parentElement.parentElement && element.parentElement.parentElement.parentElement){
            if(element.nextElementSibling){
                if((element.nextElementSibling as HTMLElement).style.display === "block"){
                    (element.nextElementSibling as HTMLElement).style.display = "none";
                }
                else{
                    (element.parentElement.parentElement.parentElement.querySelector(":scope a") as HTMLElement).focus();
                }
            }
        }
    };

    public ulStyle = {
      display : "none"
    };

    public loadItems = (items:object[], step:number)=>{
        const result:any[] = [];
        items.forEach((item:listItem)=>{
            if(item.items){
                const li = this.addChildrenToLi(item, step);
                result.push(li);
            }
            else{
                const li = this.addLi(item, step);
                result.push(li);
            }
        });
        return result;
    };

    public toggleDisplay= (element:HTMLElement)=>{
        if(element){
            if (element.style.display !== "none") {
                element.style.display = "none";
            }
            else {
                element.style.display = "block";
            }
        }
    };

    public dblClickListener= (e:React.MouseEvent<HTMLElement>)=>{
        if(e.target){
            this.toggleDisplay(((e.target as HTMLElement).nextElementSibling as HTMLElement));
            e.stopPropagation();
        }
    };

    public clickListener = (e:React.MouseEvent<HTMLElement>) => {
        (e.target as HTMLElement).focus();
        e.stopPropagation();
        this.props.getSelected(e.target);
    };

    public shouldComponentUpdate(nextProps:any, nextState:any) {
        return false
    };

    public padding=(number:number)=>{
        let start = 0;
        let space = 20;
        for(let i = 0; i < number; i++){
            start+=space;
        }
        return start;
    };

    public groupStyle = (step:number) => {
        const space:number = this.padding(step);
        return{
            cursor:"pointer",
            color : "#000000",
            paddingLeft:space+'px'
        }
    };

    public userStyle = (step:number) => {
        const space:number = this.padding(step);
        return{
            color: "#000000",
            paddingLeft:space+'px'
        }
    };

    public addChildrenToLi = (item:listItem, step:number) => {
        const ul = React.createElement("ul", {style:this.ulStyle},
            this.loadItems(item.items, step+1).map((childItem) => {
                return childItem
            })
        );
        const a = React.createElement("a", {tabIndex:1, style:this.groupStyle(step), className:"item-name", id:item.id, type:item.type},item.name);
        return React.createElement("li", {key:item.id}, a, ul);
    };

    public addLi = (item:any, step:number) => {
        const a = React.createElement("a", {tabIndex:1, style:this.userStyle(step), className:"item-name", id:item.id, type:item.type},item.name);
        return React.createElement("li", {key:item.id}, a);
    };

    public render() {
        const list = this.load();
        return (
            <div>
                <ul onClick={this.clickListener} onDoubleClick={this.dblClickListener} onKeyUp={this.keyUp} className="left tree">{list}</ul>
            </div>
        );
    }
}

export default Left;