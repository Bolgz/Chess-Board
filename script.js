const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

//Squares player owns
let ownedSquares = [
  "a2",
  "b2",
  "c2",
  "d2",
  "e2",
  "f2",
  "g2",
  "h2",
  "a1",
  "b1",
  "c1",
  "d1",
  "e1",
  "f1",
  "g1",
  "h1",
];

let computerOwnedSquares = [
  "a8",
  "b8",
  "c8",
  "d8",
  "e8",
  "f8",
  "g8",
  "h8",
  "a7",
  "b7",
  "c7",
  "d7",
  "e7",
  "f7",
  "g7",
  "h7",
];

//All chessboard squares
var squares = document.getElementsByClassName("grid-item");

//The currently highlighted square
var highlightedSquare;

//Set of valid moves a selected player piece can make
var validMoves = [];

//Set of valid moves a computer piece can make
var computerValidMoves = [];

//Colours for the helper and piece highlight
let highlightColour = "#3ad32c";
let helperColour = "#2596be";

//Is the helper enabled
let helperEnabled = true;

//Is it the computers turn to move
let computerTurn = false;

//Is the oppononent able to play against player
let oppononentEnabled = false;

//Add event listener for clicking on a square
for (let index = 0; index < squares.length; index++) {
  squares[index].addEventListener("mousedown", function (event) {
    //If computer clicks on a square that it owns then find that piece's valid move set
    if (computerTurn && checkComputerOwned(event)) {
      findMovementPath(event);
    }
    //If computer clicks on a valid move then move to that square
    else if (computerValidMoves.includes(event.target.id)) {
      moveToSquareComputer(event);
    } else {
      if (highlightedSquare) {
        //Reset highlighted valid moves back to white
        for (let index = 0; index < computerValidMoves.length; index++) {
          document.getElementById(computerValidMoves[index]).style.background =
            "white";
        }
        computerValidMoves = [];
        highlightedSquare.style.background = "white";
        colourBoard();
      }
    }
    //If player on a square it owns and it's the not the computer turn then find valid move set
    if (!computerTurn && checkPlayerOwned(event)) {
      findMovementPath(event);
    }
    //If the player clicks on a square they can move to then move to it
    else if (validMoves.includes(event.target.id)) {
      moveToSquare(event);
    } else {
      if (highlightedSquare) {
        //Reset highlighted valid moves back to white
        for (let index = 0; index < validMoves.length; index++) {
          document.getElementById(validMoves[index]).style.background = "white";
        }
        validMoves = [];
        highlightedSquare.style.background = "white";
        colourBoard();
      }
    }
  });
}

//Move to a new square
function moveToSquare(event) {
  //Remove current square from owned squares
  for (let index = 0; index < ownedSquares.length; index++) {
    if (ownedSquares[index] == highlightedSquare.id) {
      ownedSquares.splice(index, 1);
    }
  }

  //If new square is owned by comp, remove square from comp's owned squares
  for (let index = 0; index < computerOwnedSquares.length; index++) {
    if (computerOwnedSquares[index] == highlightedSquare.id) {
      computerOwnedSquares.splice(index, 1);
    }
  }

  //Add new square to owned squares
  ownedSquares.push(event.target.id);

  //Add content to next square
  event.target.dataset.value = highlightedSquare.dataset.value;
  event.target.textContent = highlightedSquare.textContent;

  let newImage = document.createElement("img");
  newImage.src = highlightedSquare.childNodes[1].src;
  newImage.className = "pieceimage";
  event.target.appendChild(newImage);

  //Clear previous square
  highlightedSquare.dataset.value = "";
  highlightedSquare.textContent = "";

  //Clear all highlights and valid moves array
  highlightedSquare.style.background = "white";
  //Reset highlighted valid moves back to white
  for (let index = 0; index < validMoves.length; index++) {
    document.getElementById(validMoves[index]).style.background = "white";
  }
  validMoves = [];
  colourBoard();

  if (oppononentEnabled) {
    playerMadeMove();
  }
}

//Move computer piece to a new square
function moveToSquareComputer(event) {
  //Remove current square from owned squares

  for (let index = 0; index < computerOwnedSquares.length; index++) {
    if (computerOwnedSquares[index] == highlightedSquare.id) {
      computerOwnedSquares.splice(index, 1);
    }
  }

  //If new square is owned by player, remove square from players's owned squares
  for (let index = 0; index < ownedSquares.length; index++) {
    if (ownedSquares[index] == highlightedSquare.id) {
      ownedSquares.splice(index, 1);
    }
  }

  //Add new square to owned squares
  computerOwnedSquares.push(event.target.id);

  //Add content to next square
  event.target.dataset.value = highlightedSquare.dataset.value;
  event.target.textContent = highlightedSquare.textContent;

  let newImage = document.createElement("img");
  newImage.src = highlightedSquare.childNodes[1].src;
  newImage.className = "pieceimage";
  event.target.appendChild(newImage);

  //Clear previous square
  highlightedSquare.dataset.value = "";
  highlightedSquare.textContent = "";

  //Clear all highlights and valid moves array
  highlightedSquare.style.background = "white";
  //Reset highlighted valid moves back to white
  for (let index = 0; index < computerValidMoves.length; index++) {
    document.getElementById(computerValidMoves[index]).style.background =
      "white";
  }
  computerValidMoves = [];
  colourBoard();
  computerTurn = false;
}

//Check if the player owns the selected square
function checkPlayerOwned(event) {
  if (ownedSquares.includes(event.target.id)) {
    if (highlightedSquare) {
      //Reset highlighted square back to white
      highlightedSquare.style.background = "white";
    }
    highlightedSquare = event.target;
    highlightedSquare.style.background = highlightColour;

    //Reset highlighted valid moves back to white
    for (let index = 0; index < validMoves.length; index++) {
      document.getElementById(validMoves[index]).style.background = "white";
    }
    validMoves = [];

    return true;
  }
}

//Check if the computer owns the selected square
function checkComputerOwned(event) {
  if (computerOwnedSquares.includes(event.target.id)) {
    if (highlightedSquare) {
      //Reset highlighted square back to white
      highlightedSquare.style.background = "white";
    }
    highlightedSquare = event.target;
    highlightedSquare.style.background = highlightColour;

    //Reset highlighted valid moves back to white
    for (let index = 0; index < computerValidMoves.length; index++) {
      document.getElementById(computerValidMoves[index]).style.background =
        "white";
    }
    computerValidMoves = [];

    return true;
  }
}

function findMovementPath(event) {
  switch (event.target.dataset.value) {
    case "Kn":
      findMovePathKnight(event);
      break;
    case "R":
      findMovePathRook(event);
      break;
    case "P":
      findMovePathPawn(event);
      break;
    case "B":
      findMovePathBishop(event);
      break;
    case "Q":
      findMovePathQueen(event);
      break;
    case "K":
      findMovePathKing(event);
      break;
  }
}

//Same as queens move set but only able to move one square in each direction
function findMovePathKing(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //Player move king code
  if (!computerTurn) {
    //-L & +N -> Move diagonally to top left
    if (letterIndex - 1 != -1 && number + 1 != 9) {
      availableMove = letters[letterIndex - 1];

      if (availableMove != undefined) {
        availableMove += (number + 1).toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //-L & -N -> Move diagonally to bottom left
    if (letterIndex - 1 != -1 && number - 1 != 0) {
      availableMove = letters[letterIndex - 1];
      if (availableMove != undefined) {
        availableMove += (number - 1).toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+L & -N -> Move diagonally to bottom right
    if (letterIndex + 1 != 9 && number - 1 != 0) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += (number - 1).toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+L & +N -> Move diagonally to top right
    if (letterIndex + 1 != 9 && number + 1 != 9) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += (number + 1).toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ letter -> move right
    if (letters[letterIndex + 1] != undefined) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += number.toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter -> move left
    if (letters[letterIndex - 1] != undefined) {
      availableMove = letters[letterIndex - 1];

      if (availableMove != undefined) {
        availableMove += number.toString();

        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num -> move up
    if (letters[letterIndex] != undefined) {
      availableMove = letters[letterIndex];

      if (number + 1 < 9) {
        availableMove += (number + 1).toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- num -> move down
    if (letters[letterIndex] != undefined) {
      availableMove = letters[letterIndex];

      if (number - 1 > 0) {
        availableMove += (number - 1).toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (ownedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    //Computer move king code
  } else {
    //-L & +N -> Move diagonally to top left
    if (letterIndex - 1 != -1 && number + 1 != 9) {
      availableMove = letters[letterIndex - 1];

      if (availableMove != undefined) {
        availableMove += (number + 1).toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //-L & -N -> Move diagonally to bottom left
    if (letterIndex - 1 != -1 && number - 1 != 0) {
      availableMove = letters[letterIndex - 1];
      if (availableMove != undefined) {
        availableMove += (number - 1).toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+L & -N -> Move diagonally to bottom right
    if (letterIndex + 1 != 9 && number - 1 != 0) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += (number - 1).toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+L & +N -> Move diagonally to top right
    if (letterIndex + 1 != 9 && number + 1 != 9) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += (number + 1).toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ letter -> move right
    if (letters[letterIndex + 1] != undefined) {
      availableMove = letters[letterIndex + 1];

      if (availableMove != undefined) {
        availableMove += number.toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter -> move left
    if (letters[letterIndex - 1] != undefined) {
      availableMove = letters[letterIndex - 1];

      if (availableMove != undefined) {
        availableMove += number.toString();

        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num -> move up
    if (letters[letterIndex] != undefined) {
      availableMove = letters[letterIndex];

      if (number + 1 < 9) {
        availableMove += (number + 1).toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- num -> move down
    if (letters[letterIndex] != undefined) {
      availableMove = letters[letterIndex];

      if (number - 1 > 0) {
        availableMove += (number - 1).toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
        if (computerOwnedSquares.includes(availableMove)) {
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    computerValidMoves = validMoves;
  }
}

//This is a cross between bishop and rook move-set
function findMovePathQueen(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //Player move queen code
  if (!computerTurn) {
    //-L & +N -> Move diagonally to top left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number + index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //-L & -N -> Move diagonally to bottom left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number - index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & -N -> Move diagonally to bottom right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number - index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & +N -> Move diagonally to top right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number + index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+ letter -> move right
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex + index] != undefined) {
        availableMove = letters[letterIndex + index];

        availableMove += number.toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (ownedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter -> move left
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex - index] != undefined) {
        availableMove = letters[letterIndex - index];

        availableMove += number.toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (ownedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num -> move up
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number + index < 9) {
          availableMove += (number + index).toString();
          if (computerOwnedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (ownedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //- num -> move down
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number - index > 0) {
          availableMove += (number - index).toString();
          if (computerOwnedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (ownedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    //Computer move queen code
  } else {
    //-L & +N -> Move diagonally to top left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number + index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //-L & -N -> Move diagonally to bottom left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number - index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & -N -> Move diagonally to bottom right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number - index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & +N -> Move diagonally to top right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number + index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+ letter -> move right
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex + index] != undefined) {
        availableMove = letters[letterIndex + index];

        availableMove += number.toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (computerOwnedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter -> move left
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex - index] != undefined) {
        availableMove = letters[letterIndex - index];

        availableMove += number.toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (computerOwnedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num -> move up
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number + index < 9) {
          availableMove += (number + index).toString();
          if (ownedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (computerOwnedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //- num -> move down
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number - index > 0) {
          availableMove += (number - index).toString();
          if (ownedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (computerOwnedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (computerOwnedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    computerValidMoves = validMoves;
  }
}

//-L -> +N or -L -> -N or +L -> -N or +L -> +N
function findMovePathBishop(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //Player move bishop code
  if (!computerTurn) {
    //-L & +N -> Move diagonally to top left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number + index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //-L & -N -> Move diagonally to bottom left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number - index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & -N -> Move diagonally to bottom right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number - index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & +N -> Move diagonally to top right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number + index).toString();

      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (ownedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    //Computer move bishop code
  } else {
    //-L & +N -> Move diagonally to top left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number + index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //-L & -N -> Move diagonally to bottom left
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex - index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex - index];
      availableMove += (number - index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & -N -> Move diagonally to bottom right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number - index <= 0) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number - index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //+L & +N -> Move diagonally to top right
    for (let index = 1; index < 9; index++) {
      if (letters[letterIndex + index] == undefined || number + index >= 9) {
        break;
      }
      availableMove = letters[letterIndex + index];
      availableMove += (number + index).toString();

      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
        break;
      }
      if (computerOwnedSquares.includes(availableMove)) {
        break;
      } else {
        validMoves.push(availableMove);
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (computerOwnedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    computerValidMoves = validMoves;
  }
}

//+ num for normal move -> + num & + or - letter for attack
function findMovePathPawn(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //CODE FOR PLAYER PAWN MOVE
  //Pawn is on first move so can move one or two squares
  if (!computerTurn) {
    if (number == 2) {
      //+2 num
      if (number + 2 != 9) {
        availableMove = letters[letterIndex];
        availableMove += (number + 2).toString();
        //Check if square directly ahead is owned
        let squareAhead = letters[letterIndex];
        squareAhead += (number + 1).toString();
        if (!ownedSquares.includes(squareAhead)) {
          if (!computerOwnedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
          }
        }
      }
      //+1 num
      if (number + 1 != 9) {
        availableMove = letters[letterIndex];
        availableMove += (number + 1).toString();
        if (!computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
      }
    } else {
      //Check square directly ahead
      if (number + 1 != 9) {
        availableMove = letters[letterIndex];
        availableMove += (number + 1).toString();
        if (!computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
      }
    }
    //check attack right
    //+ num & + letter
    if (letters[letterIndex + 1] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number + 1).toString();
      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
      }
    }

    //check attack left
    //+ num & - letter
    if (letters[letterIndex - 1] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number + 1).toString();
      if (computerOwnedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
  } else {
    //CODE FOR PLAYER COMPUTER MOVE
    if (number == 7) {
      //+2 num
      if (number - 2 != 0) {
        availableMove = letters[letterIndex];
        availableMove += (number - 2).toString();
        //Check if square directly ahead is owned
        let squareAhead = letters[letterIndex];
        squareAhead += (number - 1).toString();
        if (!computerOwnedSquares.includes(squareAhead)) {
          if (!ownedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
          }
        }
      }
      //+1 num
      if (number - 1 != 0) {
        availableMove = letters[letterIndex];
        availableMove += (number - 1).toString();
        if (!ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
      }
    } else {
      //Check square directly ahead
      if (number - 1 != 0) {
        availableMove = letters[letterIndex];
        availableMove += (number - 1).toString();
        if (!ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
        }
      }
    }
    //check attack right
    //+ num & + letter
    if (letters[letterIndex + 1] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number - 1).toString();
      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
      }
    }

    //check attack left
    //+ num & - letter
    if (letters[letterIndex - 1] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number - 1).toString();
      if (ownedSquares.includes(availableMove)) {
        validMoves.push(availableMove);
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (computerOwnedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    computerValidMoves = validMoves;
  }
}

//+ or - for letter or number -> step when reached end of array or another piece
function findMovePathRook(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //Player move rook code
  if (!computerTurn) {
    //+ letter
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex + index] != undefined) {
        availableMove = letters[letterIndex + index];

        availableMove += number.toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (ownedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex - index] != undefined) {
        availableMove = letters[letterIndex - index];

        availableMove += number.toString();
        if (computerOwnedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (ownedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number + index < 9) {
          availableMove += (number + index).toString();
          if (computerOwnedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (ownedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //- num
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number - index > 0) {
          availableMove += (number - index).toString();
          if (computerOwnedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (ownedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    //Computer move rook code
  } else {
    //+ letter
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex + index] != undefined) {
        availableMove = letters[letterIndex + index];

        availableMove += number.toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (computerOwnedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //- letter
    for (let index = 1; index < letters.length; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex - index] != undefined) {
        availableMove = letters[letterIndex - index];

        availableMove += number.toString();
        if (ownedSquares.includes(availableMove)) {
          validMoves.push(availableMove);
          break;
        }
        if (computerOwnedSquares.includes(availableMove)) {
          break;
        } else {
          validMoves.push(availableMove);
        }
      }
    }

    //+ num
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number + index < 9) {
          availableMove += (number + index).toString();
          if (ownedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (computerOwnedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //- num
    for (let index = 1; index < 9; index++) {
      //If a friendly piece is on the next square, break out of loop
      if (letters[letterIndex] != undefined) {
        availableMove = letters[letterIndex];

        if (number - index > 0) {
          availableMove += (number - index).toString();
          if (ownedSquares.includes(availableMove)) {
            validMoves.push(availableMove);
            break;
          }
          if (computerOwnedSquares.includes(availableMove)) {
            break;
          } else {
            validMoves.push(availableMove);
          }
        }
      }
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (computerOwnedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    computerValidMoves = validMoves;
  }
}

//+ or - 2 from letter -> + or - 1 from number
function findMovePathKnight(event) {
  var availableMove;
  var letter = event.target.id[0];
  var number = parseInt(event.target.id[1]);
  var letterIndex = letters.indexOf(letter);

  //Player move knight code
  if (!computerTurn) {
    //-2 letter -> -1 number
    if (letters[letterIndex - 2] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex - 2];
      availableMove += (number - 1).toString();
      validMoves.push(availableMove);
    }

    //-2 letter -> +1 number
    if (letters[letterIndex - 2] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex - 2];
      availableMove += (number + 1).toString();
      validMoves.push(availableMove);
    }

    //+2 letter -> -1 number
    if (letters[letterIndex + 2] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex + 2];
      availableMove += (number - 1).toString();
      validMoves.push(availableMove);
    }

    //+2 letter -> +1 number
    if (letters[letterIndex + 2] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex + 2];
      availableMove += (number + 1).toString();
      validMoves.push(availableMove);
    }

    //+2 num -> +1 letter
    if (letters[letterIndex + 1] != undefined && number + 2 < 9) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number + 2).toString();
      validMoves.push(availableMove);
    }

    //+2 num -> -1 letter
    if (letters[letterIndex - 1] != undefined && number + 2 < 9) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number + 2).toString();
      validMoves.push(availableMove);
    }

    //-2 num -> +1 letter
    if (letters[letterIndex + 1] != undefined && number - 2 > 0) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number - 2).toString();
      validMoves.push(availableMove);
    }

    //-2 num -> -1 letter
    if (letters[letterIndex - 1] != undefined && number - 2 > 0) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number - 2).toString();
      validMoves.push(availableMove);
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (ownedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }
    //Computer move knight code
  } else {
    //-2 letter -> -1 number
    if (letters[letterIndex - 2] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex - 2];
      availableMove += (number - 1).toString();
      validMoves.push(availableMove);
    }

    //-2 letter -> +1 number
    if (letters[letterIndex - 2] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex - 2];
      availableMove += (number + 1).toString();
      validMoves.push(availableMove);
    }

    //+2 letter -> -1 number
    if (letters[letterIndex + 2] != undefined && number - 1 != 0) {
      availableMove = letters[letterIndex + 2];
      availableMove += (number - 1).toString();
      validMoves.push(availableMove);
    }

    //+2 letter -> +1 number
    if (letters[letterIndex + 2] != undefined && number + 1 != 9) {
      availableMove = letters[letterIndex + 2];
      availableMove += (number + 1).toString();
      validMoves.push(availableMove);
    }

    //+2 num -> +1 letter
    if (letters[letterIndex + 1] != undefined && number + 2 < 9) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number + 2).toString();
      validMoves.push(availableMove);
    }

    //+2 num -> -1 letter
    if (letters[letterIndex - 1] != undefined && number + 2 < 9) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number + 2).toString();
      validMoves.push(availableMove);
    }

    //-2 num -> +1 letter
    if (letters[letterIndex + 1] != undefined && number - 2 > 0) {
      availableMove = letters[letterIndex + 1];
      availableMove += (number - 2).toString();
      validMoves.push(availableMove);
    }

    //-2 num -> -1 letter
    if (letters[letterIndex - 1] != undefined && number - 2 > 0) {
      availableMove = letters[letterIndex - 1];
      availableMove += (number - 2).toString();
      validMoves.push(availableMove);
    }

    //Remove as valid move if a friendly piece is on that square
    for (let index = 0; index < validMoves.length; index++) {
      if (computerOwnedSquares.includes(validMoves[index])) {
        validMoves.splice(index, 0);
        continue;
      }
      if (helperEnabled) {
        document.getElementById(validMoves[index]).style.background =
          helperColour;
      }
    }

    computerValidMoves = validMoves;
  }
}

function colourBoard() {
  for (let index = 0; index < 64; index++) {
    let boardSquares = document.getElementsByClassName("grid-item");
    if (index < 8) {
      if (index % 2 != 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 15 && index >= 8) {
      if (index % 2 == 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 24 && index > 15) {
      if (index % 2 != 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 32 && index > 23) {
      if (index % 2 == 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 40 && index > 31) {
      if (index % 2 != 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 48 && index > 39) {
      if (index % 2 == 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 56 && index > 47) {
      if (index % 2 != 0) {
        boardSquares[index].style.background = "grey";
      }
    }
    if (index < 64 && index > 55) {
      if (index % 2 == 0) {
        boardSquares[index].style.background = "grey";
      }
    }
  }
}

function setColours() {
  helperColour = document.getElementById("helpercolour").value;
  highlightColour = document.getElementById("highlightcolour").value;
}

function toggleHelper() {
  if (helperEnabled) {
    helperEnabled = false;
  } else {
    helperEnabled = true;
  }
}

function toggleOpponent() {
  if (oppononentEnabled) {
    oppononentEnabled = false;
  } else {
    oppononentEnabled = true;
  }
}

function resetGame() {
  window.location.reload();
}

//COMPUTERS TURN TO MOVE
function playerMadeMove() {
  computerTurn = true;

  for (let index = 0; index < computerOwnedSquares.length; index++) {
    let randomNumber = Math.floor(Math.random() * computerOwnedSquares.length);
    console.log(computerOwnedSquares.length);
    console.log(randomNumber);
    //Select a random computer piece
    let piece = computerOwnedSquares[randomNumber];

    //Generate the selected pieces valid move set
    document.getElementById(piece).dispatchEvent(new Event("mousedown"));

    if (computerValidMoves.length > 0) {
      let randomMove = Math.floor(Math.random() * computerValidMoves.length);
      document
        .getElementById(computerValidMoves[randomMove])
        .dispatchEvent(new Event("mousedown"));
      break;
    }
  }
}

colourBoard();
