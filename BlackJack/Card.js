class Card{
    constructor(name,suit,value) {
        this.name = name;
        this.suit = suit;
        this.value = value;

    }
    getName(){
        return this.name;
    }
    getValue(){
        return this.value;
    }
    getSuit(){
        return this.suit;
    }
}