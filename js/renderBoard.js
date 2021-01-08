function renderBoard(size) {
    const cellSize = 100 / size;

    // sugeneruojame baltai-juodu langeliu serija
    let whiteBlackHTML = '';
    for (let i = 0; i < size; i++) {
        const color = i % 2 === 0 ? 'white' : 'black';
        whiteBlackHTML += `<div class="cell ${color}"
                                style="width: ${cellSize}%;"></div>`;
    }

    // sugeneruojame juodai-baltu langeliu serija
    let blackWhiteHTML = '';
    for (let i = 0; i < size; i++) {
        const color = i % 2 === 1 ? 'white' : 'black';
        blackWhiteHTML += `<div class="cell ${color}"
                                style="width: ${cellSize}%;"></div>`;
    }

    // sugeneruojame finaline lenta
    let HTML = '';
    for (let i = 0; i < size; i++) {
        const cells = i % 2 === 0 ? whiteBlackHTML : blackWhiteHTML;
        HTML += `<div class="row"
                    style="height: ${cellSize}%;">${cells}</div>`;
    }

    return HTML;
}

export { renderBoard }