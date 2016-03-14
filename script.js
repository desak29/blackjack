
// 1. deal needs to call shuffle and assign the deck
// 2. set up a players starting ErrorEventHandler
// 3. place cards in correct spot


var theDeck=[];
var placeInDeck=0;

// Total Score
var playerTotalCards=2;
var dealerTotalCards=2;




$(document).ready(function(){
    $('button').click(function(){
        var clickedButton =($(this).attr('id'));
        if(clickedButton =='deal-button'){
            deal();
            
        }else if(clickedButton=='hit-button'){
            hit();
            
        }else if(clickedButton=="stand-button"){
            stand();
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
        
          if ((playerTotal===21)&&(dealerTotal=21)){
              draw=true;
              checkWin();
              message.innerHTML ="Its a Draw!";
              return;
        
          }else if(dealerTotal===21){
              checkWin();
              message.innerHTML ="Dealer Has Blackjack!";
              return;
          }else if(playerTotal===21){
              checkWin();
              message.innerHTML="Blackjack!You Win!!";
              return;
          }
        // //  REMOVE DEAL AND CLEAR BET BUTTON
        //   disableAllBttns();
          
          
          
       
          
      }
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
              if(total>21){total-10}
              
              
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
         $('#message').html('you have beaten the dealer!');
     }else{
         if(playerHas> dealerHas){
            //  player won
             $('#message').html('the player has won');
         }else if(dealerHas>playerHas){
              $('#message').html('the dealer has won');
            //  dealer won
         }else{
            //  tie
         }
     }
     
 }
 function bust(who)
 {if(who==='player'){
     $('#message').html('Dealer has busted')
 }else{
      $('#message').html('the player has busted')
 }
}
function reset(){
    $('.card').addClass('empty');
    $('.card').html('');
    $('.playerTotal').html((0));
     $('.dealerTotal').html((0));
     $('#message').html('');
     $('#hit-button')
}
     