// Board squares
const boardSquares = document.querySelectorAll(".square")
let crossBtn = document.querySelector(".cross")
let circleBtn = document.querySelector(".circle")

const Cell = () => {
    let value = 0
    const getValue = () => value 
    const setValue = val => value = val
    return {getValue, setValue}
}

const Player = (name, markerId) => {
    const getPlayerInfo = () => {
        return {name, markerId}
    }

    return {getPlayerInfo}
}

const Gameboard = () => {
    const row = 3;
    const col = 3;
    const board = []

    // create game board
    for (let i = 0; i < row; i++) {
        board[i] = []
        for (let j = 0; j < col; j++) {
            board[i].push(Cell())
        }
    }

    // get game board
    const getBoard = () => board

    // This will be used to print the current state of the 
    const printBoard = () => {
       const boardWithValues = board.map(row => row.map(cell => cell.getValue()))
       console.log(boardWithValues)
    }

    const addMarker = (player, row, col) => {
        let cell = board[row][col]
        if (cell.getValue() !== 0) {
            console.log("Invalid cell")
        } else {
            cell.setValue(player["markerId"])
            console.log(`${player["name"]} added a marker at row:${row} col:${col}`)
            printBoard()   
        }
    }

    return {getBoard, printBoard, addMarker}
}

const GameController = () => {
    const board = Gameboard()
    const playerOneObj = Player("John", 1)
    const playerTwoObj = Player("Mary", 2)

    console.log(board.printBoard())
    console.log(playerOneObj.getPlayerInfo())
    console.log(playerTwoObj.getPlayerInfo()) 

    return {board, playerOneObj, playerTwoObj}
}


const game = GameController()