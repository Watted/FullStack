
class Players {
    constructor(name){
        this.player = name;
        this.card = [];
    }
    setCard(card){
        this.card.push(card);
    }
    getScoure(){
        var result = 0;
        for (var i = 0;i<this.card.length;i++){
            result += parseInt((this.card[i]));
        }
        return result;
    }

}