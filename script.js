const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.backgroundColor = currentPlayer === 'X' ? '#FFDDC1' : '#C1E1FF';
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function checkForWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;

        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }
}

function updateStatus() {
    if (isGameActive) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    
    statusDisplay.style.color = currentPlayer === 'X' ? '#FF5733' : '#3498DB'; // Orange for X, Blue for O
    } 
    else {
        statusDisplay.style.color = '#2ECC71'; // Green for win or draw
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#ececec';
    });
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateStatus();