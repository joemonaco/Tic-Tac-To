var xChecked = document.getElementById("x-check");
var oChecked = document.getElementById("o-check");
var heading = document.getElementById("heading");

//Default for user is x
var userLetter = null;
var compLetter = null;
var usersName = "";

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

function validateGame() {
  var nameInput = document.getElementById("name");
  if (nameInput.value == "") {
    alert("Please enter a name!");
  } else {
    usersName = nameInput.value;
    if (oChecked.checked) {
      userLetter = "o";
      compLetter = "x";
      startGame();
    } else if (xChecked.checked) {
      userLetter = "x";
      compLetter = "o";
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

  heading.innerHTML = usersName + "'s turn!(" + userLetter + ")";
}

var boxes = [
  "r1c1",
  "r1c2",
  "r1c3",
  "r2c1",
  "r2c2",
  "r2c3",
  "r3c1",
  "r3c2",
  "r3c3"
];

//Turn 0 is Players turn
var turn = 0;

var userBoxes = [];
var compBoxes = [];

function boxClicked(id) {
  var box = document.getElementById(id);
  if (turn === 0) {
    if (!box.classList.contains("filled")) {
      box.classList.add(userLetter + "-added");
      box.classList.add("filled");
      let index = boxes.indexOf(id);
      userBoxes.push(boxes[index]);
      boxes.splice(index, 1);
      turn = 1;
      aiTurn();
    }
  }
}

function aiTurn() {
  if (boxes.length != 0) {
    let randomIndex = Math.floor(Math.random() * (boxes.length - 1));
    var box = document.getElementById(boxes[randomIndex]);
    box.classList.add("filled");
    box.classList.add(compLetter + "-added");
    compBoxes.push(boxes[randomIndex]);
    boxes.splice(randomIndex, 1);
    turn = 0;
  }
}
