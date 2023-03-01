const Player = () => {
    const makeMove = (x, y) => {
        GameBoard.addMark(x, y)
    }

    return {makeMove}
}

const GameBoard = (() => {
    let curr = "O"
    let gameBoard = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ]

    const displayBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            console.log(...gameBoard[i])
        }
    }

    const addMark = (x, y) => {
        if (gameBoard[x][y] === "-") {
            gameBoard[x][y] = curr
            curr = curr === "O" ? "X" : "O"
            GameBoard.displayBoard()
        } else {
            console.log("Not a valid move")
            GameBoard.displayBoard()
        }
    }

    return {displayBoard, addMark}


})();

const NewGame = (() => {
    console.log("Game Started!")
    GameBoard.displayBoard()
})();