"use strict";

// PLANNING

/* 

FUNCTIONS:


SetGame (MODULE) = To Set Player and Difficulty
GameBoard (MODULE) = Set gameboard array, set winning combinations, check for winner, clear, placing marks
Player (Factory) = Assign to either X or O, placing marks, getting gameboard array
DisplayMessage = Display Message when game has ended

AI is for later

*/
const InitializeForm = (() => {
    const form = document.querySelector("form");
    const dialog = document.querySelector("dialog");

    dialog.showModal();

    form.addEventListener("submit", () => {
        let player = document.querySelector('input[name="player"]:checked').value;
        let enemy = document.querySelector('input[name="player"]:not(:checked)').value;
        let difficulty = document.querySelector('input[name="difficulty"]:checked').value;

        SetGame(player, enemy, difficulty);
    })
})();

const SetGame = (player, enemy, difficulty) => {
    const playerInt = document.querySelector(".player-int");
    playerInt.textContent = player === "x" ? "Player: X" : "Player: O";

    const playerUser = PlayerFactory(player, true, difficulty);
    const playerEnemy = PlayerFactory(enemy, false, difficulty);

    return {playerUser, playerEnemy};
}

const GameBoard = (() => {
    const gameBoard = Array.from(document.querySelectorAll(".playing-area > div"));

    const winningBoard = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    const checkForWinner = (class_of_player) => {
        const playerSelection = Array.from(document.querySelector(`.${class_of_player}`));  
    }

    return{checkForWinner, gameBoard}
    
})();

const PlayerFactory = (player, is_user, difficulty) => {
    const gameBoard = GameBoard.gameBoard;

    

    // gameBoard.forEach((cell) => {
    //     cell.addEventListener("click", e => {
    //         console.log(`${e.target.id} has been clicked`);
    //         cell.textContent = player
    //     })
    // })
}







