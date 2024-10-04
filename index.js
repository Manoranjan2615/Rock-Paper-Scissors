let computerScore = { Win: 0, Lose: 0, tie: 0, trys: 0 };
let playerScore = { Win: 0, Lose: 0, tie: 0, trys: 0 };
let mode = 'computer';
let player1Choice = '';
let player2Choice = '';


window.onload = function () {
  let storedComputerScore = JSON.parse(localStorage.getItem('computerData'));
  let storedPlayerScore = JSON.parse(localStorage.getItem('playerData'));
  if (storedComputerScore) computerScore = storedComputerScore;
  if (storedPlayerScore) playerScore = storedPlayerScore;
  updateDisplay();
}

function setMode(selectedMode) {
  mode = selectedMode;
  document.getElementById("modeInfo").innerText = mode === 'computer' ? 'You are playing against the Computer!' : 'Two Player Mode: Both players make their moves!';
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("reset").style.display = "block";
  resetGame();

  if (mode === 'two-player') {
    toggleButtons(1, false);
    toggleButtons(2, true);
    document.getElementById("result11").innerHTML = ``;
    document.getElementById("result22").innerHTML = ``;
    document.getElementById("result12").innerHTML = ``;
    document.getElementById("player2").style.display = "block";
  } else {
    toggleButtons(1, false);
    document.getElementById("player2").style.display = "none";
  }

  updateDisplay();
}

function play(userChoice, player) {
  if (player === 1) {
    player1Choice = userChoice;
    document.getElementById("result1").innerHTML = `Player 1 has made their choice.`;

    if (mode === 'two-player') {
      toggleButtons(2, false);
    } else {
      const computerChoice = ["Rock", "Paper", "Scissor"][Math.floor(Math.random() * 3)];
      evaluateResult(userChoice, computerChoice);
    }
  } else {
    player2Choice = userChoice;
    document.getElementById("result2").innerHTML = `Player 2 has made their choice.`;

    if (player1Choice) {
      evaluateResult(player1Choice, player2Choice);
    }
  }
}

function evaluateResult(userChoice, opponentChoice) {
  if (mode === 'computer') {
    computerScore.trys++;
    evaluateOutcome(userChoice, opponentChoice, computerScore);
    document.getElementById("result11").innerHTML = `You chose: ${userChoice}`;
    document.getElementById("result12").innerHTML = `Computer chose: ${opponentChoice}`;
    localStorage.setItem('computerData', JSON.stringify(computerScore));
  } else {
    playerScore.trys++;

    evaluateOutcome(userChoice, opponentChoice, playerScore);

    localStorage.setItem('playerData', JSON.stringify(playerScore));
  }
  updateDisplay();
  resetRound();
}

function evaluateOutcome(userChoice, opponentChoice, score) {
  let result;
  if (userChoice === opponentChoice) {
    score.tie++;
    result = "It's a Tie!";
  } else if (
    (userChoice === "Rock" && opponentChoice === "Scissor") ||
    (userChoice === "Paper" && opponentChoice === "Rock") ||
    (userChoice === "Scissor" && opponentChoice === "Paper")
  ) {
    score.Win++;
    result = mode === 'computer' ? "Player 1 Wins!" : "Player 1 Wins!";
  } else {
    score.Lose++;
    result = mode === 'computer' ? "Computer Wins!" : "Player 2 Wins!";
  }
  document.getElementById("roundResult").innerHTML = result;
}

function resetScores() {
  computerScore = { Win: 0, Lose: 0, tie: 0, trys: 0 };
  playerScore = { Win: 0, Lose: 0, tie: 0, trys: 0 };
  localStorage.setItem('computerData', JSON.stringify(computerScore));
  localStorage.setItem('playerData', JSON.stringify(playerScore));
  updateDisplay();
  resetGame();
}

function resetGame() {
  player1Choice = '';
  player2Choice = '';
  document.getElementById("result1").innerHTML = '';
  document.getElementById("result2").innerHTML = '';
  toggleButtons(1, false);
  toggleButtons(2, true);
}

function resetRound() {
  player1Choice = '';
  player2Choice = '';
  document.getElementById("result1").innerHTML = '';
  document.getElementById("result2").innerHTML = '';
  toggleButtons(1, false);
  if (mode === 'two-player') toggleButtons(2, true);
}

function updateDisplay() {
  const score = mode === 'computer' ? computerScore : playerScore;
  document.getElementById("count").innerHTML = `Wins: ${score.Win}, Losses: ${score.Lose}, Ties: ${score.tie}`;
  document.getElementById("try").innerHTML = `Number of Tries: ${score.trys}`;
}

function toggleButtons(player, disable) {
  document.getElementById(`player${player}`).querySelectorAll("button").forEach(button => button.disabled = disable);
}