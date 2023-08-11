//get access to webpage elements
let score0 = document.getElementById("score--0");
let score1 = document.getElementById("score--1");
let dice = document.querySelector(".dice");
let rollDice = document.querySelector(".btn--roll");
let current1 = document.getElementById("current--0");
let current2 = document.getElementById("current--1");
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");
let holdBtn = document.querySelector(".btn--hold");
let newGame = document.querySelector(".btn--new");
let name1 = document.getElementById("name--0");
let name2 = document.getElementById("name--1");

//Initiaglize the values to 0

let scores;
let current;
let activePlayer;

//scores[activePlayer]
function init() {
  score0.textContent = 0;
  score1.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  name1.textContent = "Player 1";
  name2.textContent = "Player 2";
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  holdBtn.classList.remove("hidden");
  rollDice.classList.remove("hidden");
  dice.classList.add("hidden");

  scores = [0, 0];
  current = 0;
  activePlayer = 0;
}
init();

let switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//Implement functionlity for roll dice button
rollDice.addEventListener("click", function () {
  //1. generate a random number 1 and 6
  let diceNumber = Math.trunc(Math.random() * 6) + 1;

  //2. display the dice image with the random number
  dice.classList.remove("hidden");
  dice.src = `./asset/img/dice-${diceNumber}.png`;

  //3. if the random number is not 1  then add it to active player current score
  //4. if random number is 1 then reset current score to 0 and change the active player
  if (diceNumber !== 1) {
    current += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent = current;
    // current1.textContent = current;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener("click", function () {
  //1. add current score to global scores
  scores[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //check if the player has aready reached maximun score
  if (scores[activePlayer] >= 100) {
    //finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document.getElementById(`name--${activePlayer}`).textContent = "Winner!";
    //hide dice image
    dice.classList.add("hidden");
    holdBtn.classList.add("hidden");
    rollDice.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

//New game
newGame.addEventListener("click", init);
