/*
Game Rules
- The game has two players playing in rounds
- In each round a player rolls the dice as many times as he wishes and each results gets addeded to his round score
- If the player rolls a 1, all his round score gets lost and its the turn of the next player
- The player can choose to 'hold' which means that all his round score gets added to his global score. After that, it 
is the next player's turn.
- The first player to get to a 100 point on global score wins the game

*/
//Set variables
var scores, roundScore, activePlayer, gamePlaying;

init();

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector('#current-0').textContent = dice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  // first display a random number
  if(gamePlaying){
    var dice = Math.floor(Math.random() * 6) + 1;
    //console.log(dice);
  
    //display the result in corresponding dice image
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "./dice-" + dice + ".png";
  
    //update the round score only if the dice rolled is not a 1
    if (dice > 1) {
      //Add score to round score
      roundScore = roundScore + dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next players turn i.e Active player becomes 1 or 0
  
      nextPlayer();
    }

  }
 
});

function nextPlayer() {
  //Next players turn i.e Active player becomes 1 or 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //change the active background to the next player; remove the active class from one player to the other
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  if(gamePlaying){
     // Add the current score to global score
  scores[activePlayer] = scores[activePlayer] + roundScore;

  //Update the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //Check if the player won (first player that got to 100)
  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gamePlaying = false;
  } else {
    nextPlayer();
  }
  }
 
});
document.querySelector(".button-new").addEventListener("click", init);