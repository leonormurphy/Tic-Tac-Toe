// Credits: https://github.com/javascriptacademy-stash/tic-tac-toe

//Listen for the DOMContentLoaded event (to make sure the html has been processed by the
//browser and we can work with it)
window.addEventListener("DOMContentLoaded", () => {
    //References to all our needed html elements
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const playAgain = document.querySelector("#again");
    const announcer = document.querySelector(".announcer");
    const points1 = document.querySelector("#points1");
    const points2 = document.querySelector("#points2");
  
    //Variables for the game
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;
    let pointsX = 0;
    let pointsO = 0;
  
    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a == "" || b == "" || c == "") {
          continue;
        }
        if (a == b && b == c) {
          roundWon = true;
          break;
        }
      }
      if (roundWon) {
        announce(currentPlayer == "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
      }
      if (!board.includes("")) {
        announce.apply(TIE);
      }
    }
  
    const announce = (type) => {
      switch (type) {
        case PLAYERO_WON:
          announcer.innerHTML = 'Player <span class ="playerO">O</span> Won!';
          pointsO = pointsO + 1;
          document.getElementById("points2").innerHTML = pointsO;
          document.getElementById("reset").style.display = "none";
          document.getElementById("again").style.display = "block";
          break;
        case PLAYERX_WON:
          announcer.innerHTML = 'Player <span class ="playerX">X</span> Won!';
          pointsX = pointsX + 1;
          document.getElementById("points1").innerHTML = pointsX;
          document.getElementById("reset").style.display = "none";
          document.getElementById("again").style.display = "block";
          break;
        case TIE:
          announcer.innerText = "Tie";
      }
      announcer.classList.remove("hide"); //remove the hide class to show the announcer to the user
    };
  
    const isValidAction = (tile) => {
      if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
      }
      return true;
    };
  
    const updateBoard = (index) => {
      board[index] = currentPlayer;
    };
  
    const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === "X" ? "O" : "X"; //change current player to X if it was O or O if it was X
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
    };
  
    const userAction = (tile, index) => {
      if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
      }
    };
  
    const newGame = () => {
      document.getElementById("again").style.display = "none";
      document.getElementById("reset").style.display = "block";
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      announcer.classList.add("hide");
  
      if (currentPlayer === "O") {
        changePlayer();
      }
  
      tiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
      });
    };
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      announcer.classList.add("hide");
  
      if (currentPlayer === "O") {
        changePlayer();
      }
  
      tiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
      });
    };
  
    //Attach an event listener to every tile
    tiles.forEach((tile, index) => {
      tile.addEventListener("click", () => userAction(tile, index));
    });
  
    document.getElementById("again").style.display = "none";
    playAgain.addEventListener("click", newGame);
    resetButton.addEventListener("click", resetBoard);
  });
  