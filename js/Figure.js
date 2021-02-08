import { pieces } from './pieces.js';

class Figure {
    constructor(GAME, params, parentDOM) {
        this.GAME = GAME;
        this.x = params.x;
        this.y = params.y;
        this.type = params.type;
        this.color = params.color;
        this.selected = false;

        this.parentDOM = parentDOM;
        this.DOM = null;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const top = this.y * 12.5;
        const left = this.x * 12.5;
        const id = `${this.color}_${this.x}_${this.y}`;
        const HTML = `<div id="${id}"
                            style="top: ${top}%; left: ${left}%;"
                            class="figure">${pieces[this.color][this.type]}</div>`;
        this.parentDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.parentDOM.querySelector(`#${id}`);
    }

    select() {
        this.selected = true;
        this.DOM.classList.add('selected');
        this.showAvailableMoves();
    }

    deselect() {
        this.selected = false;
        this.DOM.classList.remove('selected');
        this.clearAvailableMoves();
    }

    getAvailableMoves() {
        console.log('Figurai nera aprasyta galimu leistinu ejimu pasieskos funkcija... just do it!');
        return [];
    }

    clearAvailableMoves() {
        // isvalo lenta nuo pries tai pazymetu galimu laisvu ejimu
        for (const cell of this.GAME.allDOMcells) {
            cell.classList.remove('free', 'attack');
        }
    }

    showAvailableMoves() {
        const moves = this.getAvailableMoves();
        this.clearAvailableMoves();

        // pazymime naujus galimus laisvus ejimus
        for (const cell of moves.free) {
            const cellIndex = cell.y * this.GAME.boardSize + cell.x;
            this.GAME.allDOMcells[cellIndex].classList.add('free');
        }

        // pazymime naujus galimus kirtimus
        for (const cell of moves.attack) {
            const cellIndex = cell.y * this.GAME.boardSize + cell.x;
            this.GAME.allDOMcells[cellIndex].classList.add('attack');
        }
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        const top = this.y * 12.5;
        const left = this.x * 12.5;

        this.DOM.style.top = top + '%';
        this.DOM.style.left = left + '%';

        this.clearAvailableMoves();
    }

    remove() {
        this.DOM.remove();
    }
}

export { Figure }