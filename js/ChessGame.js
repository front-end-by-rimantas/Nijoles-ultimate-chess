import { renderBoard } from './renderBoard.js';
import { boardPositions } from './boardPositions.js';
import { pieces } from './pieces.js';
import { Figure } from './Figure.js';

class ChessGame {
    constructor(params) {
        this.selector = params.selector;

        this.boardSize = 8;

        this.DOM = null;
        this.DOMcells = null;
        this.DOMfigures = null;
        this.DOMclicks = null;

        this.figures = [];
        this.lastSelectedFigure = null;
    }

    init() {
        if (!this.findIfValidSelector()) {
            return;
        }

        this.addLayers();
        this.DOMcells.innerHTML = renderBoard(this.boardSize);
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
            this.figures.push(new Figure(figure, this.DOMfigures));
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
            // paspaudeme ant figuros
            if (this.lastSelectedFigure) {
                if (this.lastSelectedFigure.color === figure.color) {
                    // turejome pasirinkta figura, todel keiciame pasirinkima
                } else {
                    // turejome pasirinkta figura, todel ja kertame
                }
            } else {
                // pasirenkame figura
                return;
            }
        } else {
            // paspaudeme ant tuscio langelio
            if (this.lastSelectedFigure) {
                // turejome pasirinkta figura, todel ja perkeliame
            } else {
                return;
            }
        }

        // if (figure.selected) {
        //     this.lastSelectedFigure = null;
        //     figure.deselect();
        // } else {
        //     if (this.lastSelectedFigure) {
        //         this.lastSelectedFigure.deselect();
        //     }
        //     this.lastSelectedFigure = figure;
        //     figure.select();
        // }
    }

    selectFigure() { }
    deselectFigure() { }
    selectAnotherFigure() { }
    moveFigure() { }
    moveAndAttackFigure() { }
}

export { ChessGame }