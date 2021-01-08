import { ChessGame } from './ChessGame.js';

const game = new ChessGame({
    selector: '#chessboard'
});

game.init();






























// import { renderBoard } from './renderBoard.js';
// import { renderPieces } from './renderPieces.js';
// import { boardPositions } from './boardPositions.js';
// import { pieces } from './pieces.js';




// renderBoard('#chessboard', 8);
// renderPieces('#chessboard', boardPositions, pieces);

// // prideti event listener'ius, jog spaudziam ant langeliu ir perkeliam figuras

// const allCells = document.querySelectorAll('#chessboard .cell');

// let isSelectedPiece = false;

// // for (let i = 0; i < allCells.length; i++) {
// //     const cell = allCells[i];
// for (const cell of allCells) {
//     cell.addEventListener('click', () => {
//         if (isSelectedPiece) {
//             // jei esu pasirinkes - perkeliu
//             const selected = document.querySelector('#chessboard .cell.selected');

//             // figuros perkelimas, jei tai ne tos pacios komandos laukelis
//             if (cell.dataset.team === selected.dataset.team) {
//                 return;
//             }

//             cell.innerText = selected.innerText;
//             selected.innerText = '';

//             cell.dataset.team = selected.dataset.team;
//             selected.dataset.team = '';
//             cell.dataset.type = selected.dataset.type;
//             selected.dataset.type = '';

//             selected.classList.remove('selected');

//             isSelectedPiece = false;

//         } else {
//             // jei nesu nieko pasirinkes, tai pasirenku

//             if (cell.innerText === '') {
//                 return;
//             }

//             // pirmiausia pasalinam pazymeta figura
//             const selected = document.querySelector('#chessboard .cell.selected');
//             if (selected) {
//                 selected.classList.remove('selected');
//             }

//             // pazymime paskutine paspausta figura
//             cell.classList.add('selected');
//             isSelectedPiece = true;

//             showFreeCells(cell);
//             showAttackCells(cell);
//         }

//     })
// }