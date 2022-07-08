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
        let user = document.querySelector('input[name="player"]:checked').value;
        let enemy = document.querySelector('input[name="player"]:not(:checked)').value;
        let difficulty = document.querySelector('input[name="difficulty"]:checked').value;

        SetGame(user, enemy, difficulty);
    })
})();

const SetGame = (user, enemy, difficulty) => {
    const playerInt = document.querySelector(".player-int");
    playerInt.textContent = user === "x" ? "Player: X" : "Player: O";

    const playerUser = PlayerFactory(user, true, difficulty);
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
    // let userTurn = true;

    const getPlayer = () => player;
    const getIsUser = () => is_user;
    const getDiff = () => difficulty;

    const makeTurn = () => {
        gameBoard.forEach((cell) => {
            cell.addEventListener("click", e => {
                e.target.textContent = player;
                let markClass = `${player}-mark`;
                e.target.classList.add(markClass);
                GameBoard.checkForWinner(markClass);
            })
        })
    }

    return {getPlayer, getIsUser, getDiff, makeTurn};

    // const moveUser = (event) => {
    //     if (userTurn == true) {
    //         event.target.textContent = player
    //         let userClass = `${player}-mark`
    //         event.target.classList.add(userClass);
    //         GameBoard.checkForWinner(userClass);
    //     }
    // }

    // const moveEnemy = (event) => {
    //     if (userTurn == false) {
    //         event.target.textContent = player
    //         event.target.classList.add(userClass);
    //         GameBoard.checkForWinner(userClass);
    //     }
    // }

    // gameBoard.forEach((cell) => {
    //     cell.addEventListener("click", e => {
    //         if (player === "x" && is_user) {
    //             moveUser(e);
    //             userTurn = false;
    //         }
    //         else if (player === "x" && !is_user) {
    //             moveEnemy(e);
    //             userTurn = true;
    //         }

    //     })
    // })
}









