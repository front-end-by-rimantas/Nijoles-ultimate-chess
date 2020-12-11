import { renderBoard } from './renderBoard.js';
import { renderPieces } from './renderPieces.js';
import { boardPositions } from './boardPositions.js';
import { pieces } from './pieces.js';

renderBoard('#chessboard', 8);
renderPieces('#chessboard', boardPositions, pieces);