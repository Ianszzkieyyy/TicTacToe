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

const RestartGame = (() => {

    const restartBtn = document.querySelector(".restart-btn")
    restartBtn.addEventListener("click", () => {
        location.reload();
    })
})();

const SetGame = (user, enemy, difficulty) => {
    const playerInt = document.querySelector(".player-int");
    playerInt.textContent = user === "x" ? "Player: X" : "Player: O";

    let playerUser = PlayerFactory(user, true, difficulty);
    let playerEnemy = difficulty === "user" ? PlayerFactory(enemy, true, difficulty) : PlayerFactory(enemy, false, difficulty);

    GameLoop(playerUser, playerEnemy);
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
        return winningBoard.some(combination => {
            return combination.every(index => {
                return gameBoard[index].classList.contains(class_of_player)
            })
        })
    }

    const checkForDraw = () => gameBoard.every(cell => {
        return cell.hasAttribute("class");
    })

    const checkAvailableSpot = () => gameBoard.filter(cell => {
        return !cell.hasAttribute("class");
    });

    return{checkForWinner, checkForDraw, checkAvailableSpot, gameBoard}
    
})();

const PlayerFactory = (player, is_user, difficulty) => {

    const getPlayer = () => player;
    const getIsUser = () => is_user;
    const getDiff = () => difficulty;

    let markClass = `${player}-mark`;

    const makeTurn = (event) => {
        event.target.textContent = player;
        event.target.classList.add(markClass);
    }

    const aiTurn = () => {
        let checkSpot = GameBoard.checkAvailableSpot();
        let random = Math.floor(Math.random() * checkSpot.length);
        checkSpot[random].textContent = player
        checkSpot[random].classList.add(markClass);
    }

    return {getPlayer, getIsUser, getDiff, makeTurn, aiTurn};
}

const GameLoop = (playerObj, enemyObj) => {
    let user = playerObj;
    let enemy = enemyObj;

    const gameBoard = GameBoard.gameBoard;
    const checkWin = GameBoard.checkForWinner;
    const checkDraw = GameBoard.checkForDraw;
    const titleMsg = document.querySelector(".title");

    let isUserTurn = user.getPlayer() === "x" ? true : false;
    let isGameWon = false;
    let isFirstTurnDone = false; 

    const AIFirstTurn = () => {
        setTimeout(() => {
            enemy.aiTurn();
            checkWinDraw(enemy);
            isUserTurn = true;
        }, 2000);
    }

    const checkWinDraw = (player) => {
        if (checkWin(`${player.getPlayer()}-mark`)) { SetWinner(player.getPlayer()); isGameWon = true } 
        if (checkDraw()) SetDraw();
    }

    const SetWinner = (player) => {
        titleMsg.textContent = (`${player.toUpperCase()} is the winner!`);
    }

    const SetDraw = () => {
        titleMsg.textContent = ("We Have a Draw!");
    }


    gameBoard.forEach((cell) => {
        if (isUserTurn === false && !enemy.getIsUser() && !isFirstTurnDone) { AIFirstTurn(); isFirstTurnDone = true; } 
        cell.addEventListener("click", e => {
            if (isUserTurn === true && !isGameWon && !e.target.hasAttribute("class")) {
                console.log("user toggled");
                user.makeTurn(e);
                checkWinDraw(user);
                isUserTurn = false;
                if (isUserTurn === false && !enemy.getIsUser() && !isGameWon) {
                    setTimeout(() => {
                        enemy.aiTurn();
                        checkWinDraw(enemy);
                        isUserTurn = true;
                    }, 2000);
                    
                }
            }
            else if (isUserTurn === false && enemy.getIsUser() && !isGameWon && !e.target.hasAttribute("class")) {
                console.log("enemy toggled");
                enemy.makeTurn(e)
                checkWinDraw(enemy);
                isUserTurn = true;
            }
        });
    });

    
}









