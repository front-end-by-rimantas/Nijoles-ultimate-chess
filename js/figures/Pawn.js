import { Figure } from './Figure.js';

class Pawn extends Figure {
    constructor(GAME, params, parentDOM) {
        super(GAME, params, parentDOM);
        this.moveDirection = this.y === 1 ? 1 : -1;
    }

    getAvailableMoves() {
        const freeCells = [];
        const attackCells = [];

        // ejimas per viena langeli
        const firstPosibleY = this.y + this.moveDirection;
        if (this.isValidCoordinate(this.x, firstPosibleY) &&
            this.isEmptyCell(this.x, firstPosibleY)) {
            freeCells.push({
                x: this.x,
                y: firstPosibleY,
            });
        }

        // ejimas per du langelius
        if (this.moveCount === 0 && freeCells.length === 1) {
            const secondPosibleY = this.y + this.moveDirection * 2;
            if (this.isValidCoordinate(this.x, secondPosibleY) &&
                this.isEmptyCell(this.x, secondPosibleY)) {
                freeCells.push({
                    x: this.x,
                    y: secondPosibleY,
                });
            }
        }

        const attackRightX = this.x + 1;
        const attackLeftX = this.x - 1;
        const attackY = this.y + this.moveDirection;

        // kirtimas is desines
        if (this.isValidCoordinate(attackRightX, attackY)) {
            const figure = this.cellContent(attackRightX, attackY);
            if (figure && figure.color !== this.color) {
                attackCells.push({
                    x: attackRightX,
                    y: attackY,
                });
            }
        }

        // kirtimas is kaires
        if (this.isValidCoordinate(attackLeftX, attackY)) {
            const figure = this.cellContent(attackLeftX, attackY);
            if (figure && figure.color !== this.color) {
                attackCells.push({
                    x: attackLeftX,
                    y: attackY,
                });
            }
        }

        return {
            free: freeCells,
            attack: attackCells,
        };
    }

}

export { Pawn }