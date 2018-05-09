(function ($) {
    function Card(rank,suit) {
        this.rank = rank;
        this.suit = suit;
    }

    Card.prototype.getValue = function (currentTotal) {

        var value = 0;

        if (this.rank == 'A' && currentTotal < 11){
            value = 11;
        } else if (this.rank == 'A'){
            value = 1;
        } else if (this.rank == 'J' || this.rank == 'Q' || this.rank == 'K'){
            value = 10;
        } else {
            value = parseInt(this.rank);
        }
        return value;
    }

    Card.prototype.view = function () {
        var htmlEntities = {
            'hearts' : '&#9829;',
            'diamonds' : '&#9830;',
            'clubs' : '&#9827;',
            'spades' : '&#9824;'
        };
        return `
			<div class="card ` + this.suit + `">
				<div class="top rank">` + this.rank + `</div>
				<div class="suit">` + htmlEntities[this.suit] + `</div>
				<div class="bottom rank">` + this.rank + `</div>
			</div>
		`;

    };

    function Player(element, hand) {
        this.hand = hand;
        this.element = element;

    }

    Player.prototype.getElement = function{
        return this.element;
    };

    Player.prototype.hit = function (card) {
        this.hand.push(card);

    };

    Player.prototype.getScore = function () {
        var points = 0;
        for (var i =0; i<this.hand.length;i++){
            if (i==0){
                points = this.hand[i].getValue(0)
            }else {
                points+= this.hand[i].getValue(points);
            }
        }
        return points;
    };

    Player.prototype.showHand = function () {
        var hand ="";
        for (var i =0; i<this.hand.length;i++){
            hand+=this.hand[i].view();
        }
        return hand;

    };
////////////////////////////////
   function Deck() {
       this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
       this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
       this.deck;
   }
        /*
            Fills up the deck array with cards
        */
       Deck.prototype.init = function(){
            this.deck = []; //empty the array
            for(var s = 3; s >= 0; s--){
                for(var r = 12; r >= 0; r--){
                    this.deck.push(new Card(this.ranks[r], this.suits[s]));
                }
            }
        };

        /*
            Shuffles the cards in the deck randomly
        */
       Deck.prototype.shuffle = function(){
            var j, x, i;
            for (i = this.deck.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = this.deck[i - 1];
                this.deck[i - 1] = this.deck[j];
                this.deck[j] = x;
            }
        };


    /**************************** End of Deck class *******************************/

    /*************************
     Game - Singleton class
     **************************/

     function Game(player1,player2) {
         this.deck = new Deck();
         this.deck.init();
         this.deck.shuffle();
         this.player1 = new Player(player1,[this.deck.pop(),this.deck.pop()]);
         this.player2 = new Player(player2,[this.deck.pop(),this.deck.pop()]);
        this.player1Score = $('#dealer-score span')[0];
        this.player2Score = $('#player-score span')[0];
        this.dealButton = $('#deal');
        this.hitButton = $('#hit');
        this.standButton = $('#stand');
         this.init();

    }

        /*
            Deal button event handler
        */
        Game.prototype.dealButtonHandler = function(){
            this.start();
            this.dealButton.disabled = true;
            this.hitButton.disabled = false;
            this.standButton.disabled = false;
        };

        /*
            Hit button event handler
        */
        Game.prototype.hitButtonHandler = function(num){
            //deal a card and add to player's hand

            var card = this.deck.pop();
            if (num ===1) {
                this.player1.hit(card);
                $('#' + this.player1.getElement()).innerHTML += card.view();
                this.player1Score.innerHTML = this.player1.getScore();

                //if over, then player looses
                if (this.player1.getScore() > 21) {
                    this.gameEnded('player2 won!');
                }
            }else {
                this.player2.hit(card);
                $('#' + this.player2.getElement()).innerHTML += card.view();
                this.player2Score.innerHTML = this.player2.getScore();

                //if over, then player looses
                if (this.player2.getScore() > 21) {
                    this.gameEnded('player1 won!');
                }
            }

        };

        /*
            Stand button event handler
        */
        Game.prototype.standButtonHandler = function(num){
            this.hitButton.disabled = true;
            this.standButton.disabled = true;

            //deals a card to the dealer until
            //one of the conditions below is true
            while(true){
                var card = Deck.deck.pop();

                this.dealer.hit(card);
                document.getElementById(this.dealer.element).innerHTML += card.view();
                this.dealerScore.innerHTML = this.dealer.getScore();

                var playerBlackjack = this.player.getScore() == 21,
                    dealerBlackjack = this.dealer.getScore() == 21;

                //Rule set
                if(dealerBlackjack && !playerBlackjack) {
                    this.gameEnded('You lost!');
                    break;
                } else if(dealerBlackjack && playerBlackjack) {
                    this.gameEnded('Draw!');
                    break;
                } else if(this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
                    this.gameEnded('You won!');
                    break;
                } else if(this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
                    this.gameEnded('You lost!');
                    break;
                }


            }
        };
        /*
            Initialise
        */
        Game.prototype.init = function(){
            var num = Math.floor(Math.random()*2 +1);
            //attaching event handlers
            this.dealButton.addEventListener('click', this.dealButtonHandler);
            this.hitButton.addEventListener('click', this.hitButtonHandler(num));
            this.standButton.addEventListener('click', this.standButtonHandler(num));

        };

        /*
            Start the game
        */
        Game.prototype.start = function(){


            //render the cards
            var player1Id = '#' + this.player1.element;
            var player2Id = '#' + this.player2.element;
            $(player1Id).innerHTML = this.player1.showHand();
            $(player2Id).innerHTML = this.player2.showHand();

            //renders the current scores
            this.player1Score.innerHTML = this.player1.getScore();
            this.player2Score.innerHTML = this.player2.getScore();

            this.setMessage("Hit or Stand");
        };

        /*
            If the player wins or looses
        */
        Game.prototype.gameEnded = function(str){
            this.setMessage(str);
            this.dealButton.disabled = false;
            this.hitButton.disabled = true;
            this.standButton.disabled = true;

        };

        /*
            Instructions or status of game
        */
        Game.prototype.setMessage = function(str){
            $('#status').innerHTML = str;
        }




    //Exposing the Game.init function
    //to the outside world



})(jQuery);