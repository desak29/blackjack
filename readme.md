#blackjack game using jquery,html and css
### setup the table using Bootstrap
create a dealers ahand and players hand to hold the totals
set each card to a custom width)adkist col-sm2 to 11% to avoid having to write 3 extra divs)
#JSS
add 3 buttons to the bottom of the table tso the suer can interact with teh game
bind each button to a jquery click function
and call correct function depending on the click
-bind a function called deal to the de3al button
-when called it will create a deck in default order, then swap two cards in the array 500 times.
-once all the swaps are done the deck will be shuffled. the number can be changed from 400 for varying degrees of shufflnes
-after the deck is shuffled, the playerHand and the dealerHand arrays are created with the 0,2 and 1,3 cards in theDeck array(shuffledDeck)

-the placeCard function is then called which takes 3 parameters:players hand array whose turn it is and the slot the card goes into
-place card then removes the empty class to accommaddate styling and updates html to use the card value 
-calculatetotal funciton is then called which is sent two parameters: get sthe playerHand array and whose turn it is. it slices each card in the array via loop
and removes the letter on the end

the result is turned into a number to insure we can run math functions on it. then the total is updated in the html by the new#






