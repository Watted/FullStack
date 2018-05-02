class Deck {
    constructor(){
        this.deck = [];
    }
    createDeck(){
        var suit = ['Hearts','Diamonds','Clubs','Spades'];
        var card = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];
        var value =[2,3,4,5,6,7,8,9,10,10,10,10,11]
        for (var j =0 ; j<suit.length;j++) {
            for (var i = 0; i < card.length; i++) {
                this.deck.push(new Card(card[i], suit[j],value[i]));
            }
        }
        this.shuffle();
    }
    shuffle(){
        for (var i =0 ; i<this.deck.length; i++) {
            var x = Math.floor(Math.random() * 52)
            var tmp = this.deck[i];
            this.deck[i] = this.deck[x];
            this.deck[x] = tmp;
        }
    }
    giveCard(){
        return this.deck.splice(0,1).getValue();
    }

}