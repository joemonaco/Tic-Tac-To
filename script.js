var xChecked = document.getElementById("x-check");
var oChecked = document.getElementById("o-check");
var heading = document.getElementById("heading");

function boxChecked(letter) {
  if (letter === "x") {
    if (oChecked.checked) {
      oChecked.checked = false;
    }
  } else {
    if (xChecked.checked) {
      xChecked.checked = false;
    }
  }
}

//Default for user is x
var userLetter = null;
var usersName = "";

function validateGame() {
  var nameInput = document.getElementById("name");
  if (nameInput.value == "") {
    alert("Please enter a name!");
  } else {
    usersName = nameInput.value;
    if (oChecked.checked) {
      userLetter = "x";
      startGame();
    } else if (xChecked.checked) {
      userLetter = "o";
      startGame();
    } else {
      alert("Please Choose X or O");
    }
  }
}

function startGame() {
  var gameArea = document.getElementById("game-area");
  gameArea.classList.remove("hidden");

  var newGameArea = document.getElementById("new-game");
  newGameArea.classList.add("hidden");

  heading.innerHTML = usersName + "'s turn!";
}
