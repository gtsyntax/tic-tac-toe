const GameBoard = () => {
    const board = ["","","","","","","","",""]
    
    const makeMove = (player, index) => {
        board[index] = player
    }

    const checkWin = (player) => {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ]
        
        for (let i = 0; i < winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i]
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true
            }
        }

        return false
    }

    const checkTie = () => {
        return board.every(cell => cell !== "")
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""
        }
    }

    return {makeMove, checkWin, checkTie, resetBoard, board}
}

const GameController = (() => {
    let gameBoard = GameBoard()
    let currentPlayer = "close"
    let gameOver = false 

    const boardSquares = document.querySelectorAll(".square")
    const messageDisplay = document.querySelector(".message")

    const updateUI = (index) => {
        const markerIcon = document.createElement("span")
        markerIcon.classList.add("material-symbols-outlined")
        markerIcon.setAttribute("style", "color: #43291F")
        markerIcon.textContent = currentPlayer
        boardSquares[index].appendChild(markerIcon)
    }

    const switchPlayers = () => {
        currentPlayer = currentPlayer === "close" ? "radio_button_unchecked" : "close"
    }

    const endGame = (message) => {
        messageDisplay.textContent = message
        gameOver = true
    }

    const handleMove = (event) => {
        const squareIndex = Number(event.target["id"])

        if (gameOver || gameBoard.board[squareIndex] !== "") {
            return
        }

        gameBoard.makeMove(currentPlayer, squareIndex)
        updateUI(squareIndex)

        if (gameBoard.checkWin(currentPlayer)) {
            endGame(`${currentPlayer} wins!`)
            return
        }

        if (gameBoard.checkTie()) {
            endGame("It's a tie!")
            return
        }

        switchPlayers();
        messageDisplay.textContent = `${currentPlayer}'s turn`
    }

    const resetGame = () => {
        gameBoard.resetBoard()
        currentPlayer = "close"
        gameOver = false
        messageDisplay.textContent = `${currentPlayer}'s turn`
        boardSquares.forEach(cell => cell.textContent = "")
    }

    boardSquares.forEach(cell => {
        cell.addEventListener("click", (event) => {
            handleMove(event)
        })
    })
})();