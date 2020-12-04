const freeCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const values = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let isPlayable = true;

const resultLabel = document.getElementById('result-id');
const table = document.getElementById('table-id');

function result() {
    for (let i = 0; i < 3; i++) {
        if (values[i][0] === values[i][1] && values[i][1] === values[i][2]) {
            if (values[i][0] !== '' && values[i][1] !== '' && values[i][2] !== '') {
                isPlayable = false;
                return values[i][0];
            }
        }
        if (values[0][i] === values[1][i] && values[1][i] === values[2][i]) {
            if (values[0][i] !== '' && values[1][i] !== '' && values[2][i] !== '') {
                isPlayable = false;
                return values[0][1];
            }
        }
    }
    if (values[0][0] === values[1][1] && values[1][1] === values[2][2]) {
        if (values[0][0] !== '' && values[1][1] !== '' && values[2][2] !== '') {
            isPlayable = false;
            return values[1][1];
        }
    }
    if (values[0][2] === values[1][1] && values[1][1] === values[2][0]) {
        if (values[0][2] !== '' && values[1][1] !== '' && values[2][0] !== '') {
            isPlayable = false;
            return values[1][1];
        }
    }
    if (freeCells.length === 0) {
        isPlayable = false;
        return 'nowinner';
    }
    return 'next';
}

function computerAction() {
    const index = Math.floor(Math.random() * Math.floor(freeCells.length));
    values[Math.trunc(freeCells[index] / 3)][freeCells[index] % 3] = 'O';
    freeCells.splice(index, 1);
}

function userAction(i, j) {
    const index = freeCells.indexOf(i * 3 + j);
    values[i][j] = 'X';
    freeCells.splice(index, 1);
}

function handler(event) {
    if (event.target.closest('td')) {
        const coordinates = event.target.id.toString().split('-');
        const isCellFree = values[Number(coordinates[0])][Number(coordinates[1])] === '';
        if (isPlayable && isCellFree) {
            userAction(Number(coordinates[0]), Number(coordinates[1]));
            switch (result()) {
                case 'X': resultLabel.innerText = 'Победа игрока'; break;
                case 'O': resultLabel.innerText = 'Победа компьютера'; break;
                case 'nowinner': resultLabel.innerText = 'Ничья'; break;
                default: break;
            }
        }
        if (isPlayable && isCellFree) {
            computerAction();
            switch (result()) {
                case 'X': resultLabel.innerText = 'Победа игрока'; break;
                case 'O': resultLabel.innerText = 'Победа компьютера'; break;
                case 'nowinner': resultLabel.innerText = 'Ничья'; break;
                default: break;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementById(`${i}-${j}`).innerText = values[i][j];
            }
        }
    } else {
        event.stopPropagation();
    }
}

table.addEventListener('click', handler);
