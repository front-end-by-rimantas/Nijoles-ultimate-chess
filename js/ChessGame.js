import { renderBoard } from './renderBoard.js';
import { boardPositions } from './boardPositions.js';
import { Figure } from './figures/Figure.js';
import { King } from './figures/King.js';
import { Pawn } from './figures/Pawn.js';
import { Rook } from './figures/Rook.js';
import { Bishop } from './figures/Bishop.js';

class ChessGame {
    constructor(params) {
        this.selector = params.selector;

        this.boardSize = 8;

        this.DOM = null;
        this.DOMcells = null;           // pirmasis sluoksnis
        this.allDOMcells = null;        // pirmame sluoksnyje esantys langeliai
        this.DOMfigures = null;         // antrasis sluoksnis
        this.DOMclicks = null;          // treciasis sluoksnis

        this.figures = [];
        this.lastSelectedFigure = null;
    }

    init() {
        if (!this.findIfValidSelector()) {
            return;
        }

        this.addLayers();
        this.DOMcells.innerHTML = renderBoard(this.boardSize);
        this.allDOMcells = this.DOMcells.querySelectorAll('.cell');
        this.createFigures();
        this.createClicksLayer();
    }

    findIfValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }

        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }

        this.DOM = DOM;
        return true;
    }

    addLayers() {
        const HTML = `<div class="layer cells"></div>
                    <div class="layer figures"></div>
                    <div class="layer clicks"></div>`;
        this.DOM.innerHTML = HTML;

        this.DOMcells = this.DOM.querySelector('.layer.cells');
        this.DOMfigures = this.DOM.querySelector('.layer.figures');
        this.DOMclicks = this.DOM.querySelector('.layer.clicks');
    }

    createFigures() {
        for (const figure of boardPositions) {
            switch (figure.type) {
                case 'king':
                    this.figures.push(new King(this, figure, this.DOMfigures));
                    break;
                case 'pawn':
                    this.figures.push(new Pawn(this, figure, this.DOMfigures));
                    break;
                case 'rook':
                    this.figures.push(new Rook(this, figure, this.DOMfigures));
                    break;
                case 'bishop':
                    this.figures.push(new Bishop(this, figure, this.DOMfigures));
                    break;

                default:
                    this.figures.push(new Figure(this, figure, this.DOMfigures));
                    break;
            }
        }
    }

    createClicksLayer() {
        const cellSize = 100 / this.boardSize;

        // sugeneruojame baltai-juodu langeliu serija
        let cellsHTML = '';
        for (let i = 0; i < this.boardSize; i++) {
            cellsHTML += `<div data-x="${i}" class="cell trans" style="width: ${cellSize}%;"></div>`;
        }

        // sugeneruojame finaline lenta
        let HTML = '';
        for (let i = 0; i < this.boardSize; i++) {
            HTML += `<div data-y="${i}" class="row" style="height: ${cellSize}%;">${cellsHTML}</div>`;
        }

        this.DOMclicks.innerHTML = HTML;

        const allCells = this.DOMclicks.querySelectorAll('.cell');

        for (const cell of allCells) {
            cell.addEventListener('click', () => {
                const x = +cell.dataset.x;
                const y = +cell.closest('.row').dataset.y;

                this.cellClick(x, y);
            })
        }
    }

    cellClick(x, y) {
        const figure = this.figures.filter(figure => figure.x === x && figure.y === y)[0];

        if (figure) {
            if (this.lastSelectedFigure) {
                if (figure.x === this.lastSelectedFigure.x &&
                    figure.y === this.lastSelectedFigure.y) {
                    this.deselectFigure();
                    return;
                }

                if (this.lastSelectedFigure.color === figure.color) {
                    this.selectAnotherFigure(figure);
                } else {
                    this.moveAndAttackFigure(figure);
                }
            } else {
                this.selectFigure(figure);
                return;
            }
        } else {
            if (this.lastSelectedFigure) {
                this.moveFigure(x, y);
            } else {
                return;
            }
        }
    }

    selectFigure(figure) {
        // niekas nepasirinkta ir paspaudem ant figuros
        this.lastSelectedFigure = figure;
        figure.select();
    }
    deselectFigure() {
        // pasirinkta figura ir dar karta ant jos paspaudem, tai nuzymim
        this.lastSelectedFigure.deselect();
        this.lastSelectedFigure = null;
    }
    selectAnotherFigure(figure) {
        // pasirinkta figura ir paspaudem ant savo kitos, tai tiesiog perkeliam pazymejima
        this.lastSelectedFigure.deselect();
        this.lastSelectedFigure = figure;
        figure.select();
    }
    moveFigure(x, y) {
        // pazymetos figuros perkelimas i tuscia langeli
        this.lastSelectedFigure.move(x, y);
        this.lastSelectedFigure.deselect();
        this.lastSelectedFigure = null;
    }
    moveAndAttackFigure(figure) {
        // pazymetos figuros perkelimas i langeli su priesingos spalvos figura
        // kirtimas - prieso pasalinimas
        const { x, y } = figure;
        figure.remove();
        this.figures = this.figures.filter(figure => figure.x !== x || figure.y !== y);

        // perkelimas (saves)
        this.lastSelectedFigure.move(x, y);
        this.lastSelectedFigure.deselect();
        this.lastSelectedFigure = null;
    }
}

export { ChessGame }