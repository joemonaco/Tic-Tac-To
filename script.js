var xChecked = document.getElementById("x-check");
var oChecked = document.getElementById("o-check");
var heading = document.getElementById("heading");

//Default for user is x
var userLetter = null;
var compLetter = null;
var usersName = "";

var isWinner = false;

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

var boxes = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var placed = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];

//Turn 0 is Players turn
var turn = 0;

var userBoxes = [];
var compBoxes = [];

function boxClicked(id, row, col) {
  if (!isWinner) {
    var box = document.getElementById(id);
    if (turn === 0) {
      if (boxes.includes(id)) {
        box.classList.add(userLetter + "-added");

        let index = boxes.indexOf(id);
        userBoxes.push(boxes[index]);

        placed[row][col] = userLetter;

        boxes.splice(index, 1);

        if (!checkWinner()) {
          turn = 1;
          heading.innerHTML = "AI Turn";
          aiTurn();
        } else {
          endGame();
        }
      }
    }
  }
}

function aiTurn() {
  if (!isWinner) {
    setTimeout(function() {
      if (boxes.length != 0) {
        let randomIndex = Math.floor(Math.random() * (boxes.length - 1));
        var box = document.getElementById(boxes[randomIndex]);

        box.classList.add(compLetter + "-added");
        compBoxes.push(boxes[randomIndex]);
        boxes.splice(randomIndex, 1);
        if (!checkWinner()) {
          turn = 0;
          heading.innerHTML = usersName + "'s turn!(" + userLetter + ")";
        } else {
          endGame();
        }
      }
    }, 500);
  }
}

function checkBoxes() {
  //Rows
  if (placed[0][0] == placed[0][1] && placed[0][1] == placed[0][2]) {
    return placed[0][0];
  }
  if (placed[1][0] == placed[1][1] && placed[1][1] == placed[1][2]) {
    return placed[1][0];
  }
  if (placed[2][0] == placed[2][1] && placed[2][1] == placed[2][2]) {
    return placed[2][0];
  }
  //columns
  if (placed[0][0] == placed[1][0] && placed[1][0] == placed[2][0]) {
    return placed[0][0];
  }
  if (placed[0][1] == placed[1][1] && placed[1][1] == placed[2][1]) {
    return placed[0][1];
  }
  if (placed[0][2] == placed[1][2] && placed[1][2] == placed[2][2]) {
    return placed[0][2];
  }
  //Diagnol
  if (placed[0][0] == placed[1][1] && placed[1][1] == placed[2][2]) {
    return placed[0][0];
  }
  if (placed[0][2] == placed[1][1] && placed[1][1] == placed[0][2]) {
    return placed[0][2];
  }

  if (boxes.length == 0) {
    return "t";
  } else {
    return "not yet";
  }
}

function checkWinner() {
  let winner = checkBoxes();

  if (winner === userLetter) {
    heading.innerHTML = usersName + " Has Won!";
    isWinner = true;
    return true;
  } else if (winner === compLetter) {
    heading.innerHTML = "AI Has Won!";
    isWinner = true;
    return true;
  } else if (winner === "t") {
    heading.innerHTML == "TIE GAME!";
    isWinner = true;
    return true;
  }
  return false;
}

function endGame() {
  setTimeout(function() {
    var gameArea = document.getElementById("game-area");
    gameArea.classList.add("hidden");

    var newGameArea = document.getElementById("new-game");
    newGameArea.classList.remove("hidden");

    boxes = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    placed = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];

    for (var i = 0; i < 9; i++) {
      let box = document.getElementById(boxes[i]);
      console.log(boxes[i]);
      if (box.classList.contains("x-added")) {
        box.classList.remove("x-added");
      }
      if (box.classList.contains("o-added")) {
        box.classList.remove("o-added");
      }
    }
    heading.innerHTML = "Tic-Tac-Toe";

    compBoxes = [];
    userBoxes = [];
  }, 1000);
}
