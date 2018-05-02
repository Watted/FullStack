class Hand {
    constructor(){
        this.hand = new Deck();
        this.player1 = new Players('Mohammed');
        this.player2 = new Players('Ofer');
    }
    setCard(){
        this.hand.createDeck();
        for(var i =0;i< 2;i++){
            this.player1.setCard(this.hand.giveCard());
            this.player2.setCard(this.hand.giveCard());
        }
    }
    hit(name){

    }


}