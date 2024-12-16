let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const titleHeader = document.getElementById('titleHeader');
let gameActive = true;

const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6], // Diagonal from top-right
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            titleHeader.textContent = `${cells[a].textContent} Wins!`;
            restartBtn.style.visibility = 'visible';
            return true;
        }
    }

    // Check for a draw
    if ([...cells].every(cell => cell.textContent !== '')) {
        gameActive = false;
        titleHeader.textContent = "It's a Draw!";
        restartBtn.style.visibility = 'visible';
        return false;
    }

    return false;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameActive || cell.textContent !== '') return;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');
        if (checkWinner()) return;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        titleHeader.textContent = `${currentPlayer}'s Turn`;
    });
});

restartBtn.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-mark', 'o-mark');
    });
    currentPlayer = 'X';
    titleHeader.textContent = 'Choose';
    restartBtn.style.visibility = 'hidden';
    gameActive = true;
});