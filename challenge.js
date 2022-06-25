/*  Challenge Rules
1. A player looses his entire score when he rolls two six in a row after that its the next players turn
2. An input field is added where user can set the winner score
3. Add another dice to the game so that there are two dices. 
A player looses his current score if any of the dice is a 1

*/

//Set variables
var scores, roundScore, activePlayer, gamePlaying;

init();
var previous;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previous = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".second-dice").style.display = "none";
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
  document.querySelector("input").placeholder = "Final Score";
}

//document.querySelector('#current-0').textContent = dice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  // first display a random number
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceValue = Math.floor(Math.random() * 6) + 1;
    //console.log(dice);

    //display the result in corresponding dice image
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "./dice-" + dice + ".png";
    var diceDisp = document.querySelector(".second-dice");
    diceDisp.style.display = "block";
    diceDisp.src = "./dice-" + diceValue + ".png";

    //update the round score only if the dice rolled is not a 1

    if (dice > 1 && diceValue > 1) {
      //Add score to round score
      roundScore = roundScore + dice + diceValue;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else if (dice === 1 || diceValue === 1) {
      //loose current score
      document.querySelector("#current-" + activePlayer).textContent = "0";
      nextPlayer();
    } else {
      //Next players turn i.e Active player becomes 1 or 0
      nextPlayer();
    }
    /*if (dice === 6 && previous === 6){
        //player looses score
        roundScore = 0;
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else{
        //Add score to round score
      roundScore = roundScore + dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
        previous = dice;*/
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
  document.querySelector(".second-dice").style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add the current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //Update the UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if the player won (first player that got to 100)
    var winningScore;
    var val = document.querySelector("input").value;

    if (val) {
      winningScore = val;
    } else {
      winningScore = 10;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".second-dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".button-new").addEventListener("click", init);
