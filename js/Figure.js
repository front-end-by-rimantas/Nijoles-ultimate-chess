import { pieces } from './pieces.js';

class Figure {
    constructor(params, parentDOM) {
        this.x = params.x;
        this.y = params.y;
        this.type = params.type;
        this.color = params.color;

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
}

export { Figure }