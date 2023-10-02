const gameBoard = document.querySelector('#gameboard');
const info = document.querySelector('#info');
const restart = document.querySelector('#restart')
const startCells = [
    "", "", "","", "", "","", "", ""
]
let go = Math.random() < 0.5 ? "Dairə" : "X"; // Randomly choose starting player
info.textContent = `${go.charAt(0).toUpperCase() + go.slice(1)} birinci gedişi edir...`;

function createBoard(){
    startCells.forEach((_cell, index)=>{
        const cellElement = document.createElement('div')
        cellElement.classList.add('square');
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}


createBoard()



function addGo(e){

    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "Dairə" ? "X" : "Dairə"
    info.textContent = `Hazırda ${go} sırasıdır`
    e.target.removeEventListener("click", addGo)
    checkScore()
    checkForTie()
}


function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    let gameWon = false; // Add a flag to check if the game is won
  
    winningCombos.forEach(array => {
      const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('Dairə'));
      const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('X'));
  
      if (circleWins || crossWins) {
        gameWon = true; // Set the gameWon flag if there's a win
  
        if (circleWins) {
          info.textContent = "Dairə qazandı!";
        } else {
          info.textContent = "X qazandı!";
        }
  
        allSquares.forEach(square => {
          square.replaceWith(square.cloneNode(true));
        });
  
        // Exit the forEach loop early if there's a win
        return;
      }
    });
  
    // Check for a tie only if the game is not already won
    if (!gameWon) {
      const isTie = Array.from(allSquares).every(square => square.firstChild);
      if (isTie) {
        info.textContent = "It's a tie!";
      }
    }
  }
  



    function checkForTie() {
        const allSquares = document.querySelectorAll(".square");
        const isTie = Array.from(allSquares).every((square) => square.firstChild);
        if (isTie) {
          info.textContent = "Bərabərə!";
        }
      }



      restart.addEventListener('click', () => {
        location.reload(); 
      });