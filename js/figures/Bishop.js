import { Figure } from './Figure.js';

class Bishop extends Figure {
    constructor(GAME, params, parentDOM) {
        super(GAME, params, parentDOM);
    }

    directionalMoves(xDirection, yDirection) {
        const freeCells = [];
        const attackCells = [];

        // zemiau esantys 4 ciklai LABAI nori buti optimizuoti...

        // i desine ir i virsu
        for (let i = 1; i < this.GAME.boardSize; i++) {
            const posibleX = this.x + i * xDirection;
            const posibleY = this.y + i * yDirection;

            if (!this.isValidCoordinate(posibleX, posibleY)) {
                break;
            }

            const cellContent = this.cellContent(posibleX, posibleY);

            if (!cellContent) {
                freeCells.push({
                    x: posibleX,
                    y: posibleY,
                })
            } else {
                if (cellContent.color !== this.color) {
                    attackCells.push({
                        x: posibleX,
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

    getAvailableMoves() {
        const topRight = this.directionalMoves(1, -1);
        const topLeft = this.directionalMoves(-1, -1);
        const bottomRight = this.directionalMoves(1, 1);
        const bottomLeft = this.directionalMoves(-1, 1);

        return {
            free: [
                ...topRight.free,
                ...topLeft.free,
                ...bottomRight.free,
                ...bottomLeft.free,
            ],
            attack: [
                ...topRight.attack,
                ...topLeft.attack,
                ...bottomRight.attack,
                ...bottomLeft.attack,
            ],
        };
    }

}

export { Bishop }