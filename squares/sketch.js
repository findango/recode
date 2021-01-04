// Based on "Structured Square Series - Inward" by Roger Coqart
// Originally published in "Computer Graphics and Art" vol1 no3, 1976
// See: http://recodeproject.com/artwork/v1n3structure-square-series-inwards

const r = new Rune({
    container: 'body',
    width: 720,
    height: 720,
    debug: false,
});

const margin = 20;

const grid = r.grid({
    x: margin,
    y: margin,
    width: r.width - 2 * margin,
    height: r.height - 2 * margin,
    gutter: 15,
    rows: 16,
    columns: 16,
});

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const randomLines = (width, height, count) => {
    const lines = [
        [width / 2, 0, width / 2, height],
        [0, height / 2, width, height / 2],
        [0, 0, width, height],
        [width, 0, 0, height],
        [width / 2, 0, width, height / 2],
        [width, height / 2, width / 2, height],
        [width / 2, height, 0, height / 2],
        [0, height / 2, width / 2, 0],
    ];
    return shuffle(lines).slice(0, count);
};

const makeCell = (width, height, count) => {
    const group = r.group();
    const lines = randomLines(width, height, count);
    lines.forEach((points) => r.line(...points, group).stroke('#000000'));
    r.rect(0, 0, width, height, group).fill('none').stroke('#000000');
    return group;
};

for (let row = 1; row <= grid.state.rows; row++) {
    for (let col = 1; col <= grid.state.columns; col++) {
        const cell = makeCell(
            grid.state.moduleWidth,
            grid.state.moduleHeight,
            Math.ceil((row - 1) / 2),
        );
        grid.add(cell, col, row);
    }
}

r.draw();
