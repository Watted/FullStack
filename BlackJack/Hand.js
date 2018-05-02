
var hand = new Deck();
var player1 = new Players('Mohammed');
var player2 = new Players('Ofer');
run();
var choice
function run() {
}

function setCard() {
    this.hand.createDeck();
    for (var i = 0; i < 2; i++) {
        this.player1.setCard(this.hand.giveCard());
        this.player2.setCard(this.hand.giveCard());
    }
}

function hit(name) {
    if (name === 'Mohammed') {
        this.player1.setCard(this.hand.giveCard());
    } else {
        this.player2.setCard(this.hand.giveCard());
    }
}

function stand(name) {
    return name === 'Mohammed' ? this.player1.getScoure() : this.player2.getScoure();
}


