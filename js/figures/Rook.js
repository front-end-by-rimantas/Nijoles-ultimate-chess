import { Figure } from './Figure.js';

class Rook extends Figure {
    constructor(GAME, params, parentDOM) {
        super(GAME, params, parentDOM);
    }

    getAvailableMoves() {
        const freeCells = [];
        const attackCells = [];

        // zemiau esantys 4 ciklai LABAI nori buti optimizuoti...

        // i desine
        for (let x = 1; x < this.GAME.boardSize; x++) {
            const posibleX = this.x + x;

            if (!this.isValidCoordinate(posibleX, this.y)) {
                break;
            }

            const cellContent = this.cellContent(posibleX, this.y);

            if (!cellContent) {
                freeCells.push({
                    x: posibleX,
                    y: this.y,
                })
            }

            if (cellContent) {
                if (cellContent.color !== this.color) {
                    attackCells.push({
                        x: posibleX,
                        y: this.y,
                    });
                }
                break;
            }
        }

        // i kaire
        for (let x = 1; x < this.GAME.boardSize; x++) {
            const posibleX = this.x - x;

            if (!this.isValidCoordinate(posibleX, this.y)) {
                break;
            }

            const cellContent = this.cellContent(posibleX, this.y);

            if (!cellContent) {
                freeCells.push({
                    x: posibleX,
                    y: this.y,
                })
            }

            if (cellContent) {
                if (cellContent.color !== this.color) {
                    attackCells.push({
                        x: posibleX,
                        y: this.y,
                    });
                }
                break;
            }
        }

        // i virsu
        for (let y = 1; y < this.GAME.boardSize; y++) {
            const posibleY = this.y - y;

            if (!this.isValidCoordinate(this.x, posibleY)) {
                break;
            }

            const cellContent = this.cellContent(this.x, posibleY);

            if (!cellContent) {
                freeCells.push({
                    x: this.x,
                    y: posibleY,
                })
            }

            if (cellContent) {
                if (cellContent.color !== this.color) {
                    attackCells.push({
                        x: this.x,
                        y: posibleY,
                    });
                }
                break;
            }
        }

        // i apacia
        for (let y = 1; y < this.GAME.boardSize; y++) {
            const posibleY = this.y + y;

            if (!this.isValidCoordinate(this.x, posibleY)) {
                break;
            }

            const cellContent = this.cellContent(this.x, posibleY);

            if (!cellContent) {
                freeCells.push({
                    x: this.x,
                    y: posibleY,
                })
            }

            if (cellContent) {
                if (cellContent.color !== this.color) {
                    attackCells.push({
                        x: this.x,
                        y: posibleY,
                    });
                }
                break;
            }
        }

        // karaliaus atveju, reikia patikrinti tarp galimu laisvu langeliu nera puolamu

        return {
            free: freeCells,
            attack: attackCells,
        };
    }

}

export { Rook }