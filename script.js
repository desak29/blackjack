
// 1. deal needs to call shuffle and assign the deck
// 2. set up a players starting ErrorEventHandler
// 3. place cards in correct spot

// fix game win issues fix button game issues add betting features add rebet featurest
var theDeck=[];
var placeInDeck=0;

// Total  number of cards  dealt
var playerTotalCards=2;
var dealerTotalCards=2;

var placeInDeck = 0;
var bankroll = 500;
var bet = 0;
var prevBet = 0;
// IS A GAME BEING PLAYED
// var won = false;
// var draw = false;
// var playing = false;

// ARRAY FOR PLAYERS HANDS
// var playerHand;
// var dealerHand;
// IF PLAYER BUST BOOLEAN
// var dealerBust = false;
// var playerBust = false;
// // IF PLAYER STANDS 
// var playerStand = false;
// // PLAYER TOTALS
// var playerTotal = 0;
// var dealerTotal = 0;
// SHORTCUTS FOR ELEMENT DIVS AND BUTTONS
var message = document.getElementById("message");
var buttons = document.getElementsByClassName("game-buttons");






$(document).ready(function(){
    $('button').click(function(){
        var clickedButton =($(this).attr('id'));
        if(clickedButton =='deal-button'){
            deal();
            
            // $('#dealer-total').addClass("hidden");
            //   $("#stand-button").removeClass("hidden");
            // $("#hit-button").removeClass("hidden");
            // $('#deal-button').removeClass("active")
            
        }else if(clickedButton=='hit-button'){
            hit();
            
        }else if(clickedButton=="stand-button"){
            stand();
        }else if(clickedButton=="reset-button"){
            reset();
        }
        
    });    
      });
      function deal()
      {
          shuffleDeck();
          placeCard();
          playerHand=[theDeck[0],theDeck[2]];
          dealerHand=[theDeck[1],theDeck[3]];
          placeInDeck=4;
          placeCard(playerHand[0],'player','one');
          placeCard(dealerHand[0],'dealer','one');
           placeCard(playerHand[1],'player','two');
          placeCard(dealerHand[1],'dealer','two');
          playerTotal=calculateTotal(playerHand,'player');
         
          dealerTotal=calculateTotal(dealerHand,'dealer');
          
   $('span.dealer-total').addClass('hidden');
  
          
        //   if ((playerTotal===21)&&(dealerTotal==21)){
        //       draw=true;
        //       checkWin();
        //       message.innerHTML ="Its a Draw!";
        //       return;
        
        //   }else if(dealerTotal===21){
        //       checkWin();
        //       message.innerHTML ="Dealer Has Blackjack!";
        //       return;
        //   }else if(playerTotal===21){
        //       checkWin();
        //       message.innerHTML="Blackjack!You Win!!";
        //       return;
              
        //   }
        // //  REMOVE DEAL AND CLEAR BET BUTTON
        document.getElementById('deal-button').classList.remove('active');
        document.getElementById('deal-button').classList.add('hidden');
            document.getElementById('clear-bet-button').classList.remove('active');
        document.getElementById('clear-bet-button').classList.add('hidden');
        // show hit & stand button
	document.getElementById('hit-button').classList.remove("hidden");
	document.getElementById('hit-button').classList.add('active');
	document.getElementById('stand-button').classList.remove('hidden');
	document.getElementById('stand-button').classList.add('active');	

	// document
}

        //   disableAllBttns();
          
          
          
       
          
      
    //   hand, who are placeholder variables for player or dealer above
       function calculateTotal(hand,who){
          var total=0;
          var acesCount=0;
          for(i=0;i<hand.length;i++)
          {
              var cardValue= Number(hand[i].slice(0,-1));
              if((cardValue ==11)||(cardValue==12)||(cardValue==13)){
                  cardValue=10;
              }if(cardValue ==1){
                  cardValue=11;
              }console.log(cardValue)
              total += cardValue;
              if((total>21)&&(cardValue="1")){total-10}
              
              
          }
          var idToGet= '.'+who+'-total';
          $(idToGet).html(total);
          if(total>21)
          bust('whosturn');
        //   maybe a place to deal with over 21
        
      }
      function placeCard(card,who,slot){
          var currId='#' + who+('-card-')+slot;
          $(currId).removeClass('empty');
          $(currId).html('<img src="image/'+card+'.png">')
          
   
       
      }
  
     
      function shuffleDeck()
      {
        //   fill the deck in order, for now deck is made up of 52 cards 4 suits:h,s,d,call
        // s1=hearts,s2=spades,s3=diamonds,s4=clubs
        for(s=1;s<=4;s++)
        {
            var suit="";
            if(s===1){
                suit='h';
            }else if(s===2){
                suit="s";
            }else if(s===3){
                suit="d";
            }else if(s===4){
                suit="c";
            }for(i=1;i<=13;i++)
            {
                theDeck.push(i+suit);
            }
      }
            var numberOfTimesToShuffle =500;
            for(i=1;i<numberOfTimesToShuffle;i++)
            {
                card1=Math.floor(Math.random()*theDeck.length);
                card2=Math.floor(Math.random()*theDeck.length);
                if(card1 != card2)
                    {temp=theDeck[card1];
                     theDeck[card1]=theDeck[card2];
                     theDeck[card2]=temp;
                    }
            }
      
  
       }
       
    function hit(){
        var slot='';
        if(playerTotalCards==2){slot='three';}
        // same as player.Cards.length..
        else if(playerTotalCards==3){slot='four';}
    else if(playerTotalCards==4){slot='five';}
    else if(playerTotalCards==5){slot='six';}
    placeCard(theDeck[placeInDeck],'player',slot);
    playerHand.push(theDeck[placeInDeck]);
    placeInDeck++;
    playerTotalCards++;
  
    calculateTotal(playerHand,"player")
    }
    function stand(){
        var dealerTotal=$('.dealer-total').html();
        while(dealerTotal<17)
        { if(dealerTotalCards==2)
            {slot='three';}
        // same as player.Cards.length..
        else if(dealerTotalCards==3){slot='four';}
    else if(dealerTotalCards==4){slot='five';}
    else if(dealerTotalCards==5){slot='six';}
    placeCard(theDeck[placeInDeck],'dealer',slot);
    dealerHand.push(theDeck[placeInDeck]);
    dealerTotalCards++;
    placeInDeck++;
    calculateTotal(dealerHand,'dealer');
    dealerTotal=$('.dealer-total').html();
            
        }
        checkWin()
        $('.dealer-total').html();
    }
    
    
 function checkWin(){
     var playerHas=Number($('.player-total'));
     var dealerHas=Number($('.dealer-total').html());
     if (dealerHas>21){ 
        //  the dealer has busted
         $('#message').html('The Dealer Busted!');
     }else{
         if(playerHas> dealerHas){
            //  player won
             $('#message').html("You Won!");
         }else if(dealerHas>playerHas){
              $('#message').html("The Dealer Won");
            //  dealer won
         }else if(playerHas=dealerHas){
             $('#message').html("Its a Draw, Bets Scratched")
         }
             
            //  tie
         }
     }
     
 
 function bust(who)
 {if(who==='player'){
     $('#message').html('Dealer has busted')
 }else{
      $('#message').html('the player has busted')
 }
}

  function reset() {
    //empty the deck
    //reset the place in the deck
    //reset the players total cards
    //reset the dealers total cards
    //reset the players hand array
    //reset the dealers hand array
    //reset the message
    //reset all the cards (divs and the empty class)

    deck = [];
    placeInDeck = 0;
    bet = 0;
	playerTotalCards = 2;
	dealerTotalCards = 2;

	document.getElementById('message').innerHTML = "Lets Play!";
	
	var cards = document.getElementsByClassName('card');

	for(i = 0;i < cards.length; i++){
		cards[i].classList.add("empty")
		cards[i].innerHTML = ""
	}

	// reset player totals
	document.getElementsByClassName('player-total')[0].innerHTML = 0;
    // returns an array of an element the 0 indicates the first object in the array.
	document.getElementsByClassName('dealer-total')[0].innerHTML = 0;
	// document.getElementById('total-bet').innerHTML = bet;
	
	// reset playing buttons 
	// disableAllBtns();
	document.getElementById('deal-button').classList.remove('hidden');
	document.getElementById('deal-button').classList.add('active');
	document.getElementById('hit-button').classList.remove('active');
	document.getElementById('hit-button').classList.add('hidden');
	document.getElementById('stand-button').classList.remove('active');
	document.getElementById('stand-button').classList.add('hidden');
    consolel

	// for(i = 0;i < buttons.length;i++){
	// 	buttons[i].disabled = false;
	// }
	
}
     