import { Figure } from './Figure.js';

class King extends Figure {
    constructor(GAME, params, parentDOM) {
        super(GAME, params, parentDOM);
    }

    getAvailableMoves() {
        const freeCells = [];
        const attackCells = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const posibleX = this.x + x;
                const posibleY = this.y + y;

                // tikriname, jog langelis yra lentos ribose
                if (!this.isValidCoordinate(posibleX, posibleY)) {
                    continue;
                }

                // tikriname, ar galimas aplinkinis langelis yra tuscias
                const cellContent = this.cellContent(posibleX, posibleY);

                if (!cellContent) {
                    freeCells.push({
                        x: posibleX,
                        y: posibleY,
                    })
                }

                if (cellContent && cellContent.color !== this.color) {
                    attackCells.push({
                        x: posibleX,
                        y: posibleY,
                    })
                }
            }
        }

        // karaliaus atveju, reikia patikrinti tarp galimu laisvu langeliu nera puolamu

        return {
            free: freeCells,
            attack: attackCells,
        };
    }

}

export { King }