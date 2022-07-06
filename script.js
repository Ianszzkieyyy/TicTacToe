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

    form.addEventListener("submit", () => {
        let player = document.querySelector('input[name="player"]:checked').value;
        let enemy = document.querySelector('input[name="player"]:not(:checked)').value;
        let difficulty = document.querySelector('input[name="difficulty"]:checked').value;

        SetGame(player, enemy, difficulty);
    })
})();

const SetGame = (player, enemy, difficulty) => {
    return {player, enemy, difficulty};
}

const GameBoard = (() => {
    const gameBoard = Array.from(document.querySelectorAll(".playing-area > [data-cell]"));
    
})();





