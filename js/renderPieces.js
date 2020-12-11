function renderPieces(selector, boardPositions, pieces) {
    const DOM = document.querySelector(selector);

    for (let piece of boardPositions) {
        const pieceSelector = `.row:nth-of-type(${piece.y + 1}) > .cell:nth-of-type(${piece.x + 1})`;
        const pieceDOM = DOM.querySelector(pieceSelector);

        const color = piece.color;
        const type = piece.type;

        pieceDOM.innerHTML = pieces[color][type];
    }
}

export { renderPieces }