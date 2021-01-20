// Based on "Structured Square Series - Inward" by Roger Coqart
// Originally published in "Computer Graphics and Art" vol1 no3, 1976
// See: http://recodeproject.com/artwork/v1n3structure-square-series-inwards

const width = 580;
const height = 580;
const margin = 60;

const r = new Rune({
    container: '#sketch',
    width: width + 2 * margin,
    height: height + 2 * margin,
    debug: false,
});

const grid = r.grid({
    x: margin,
    y: margin,
    width: width,
    height: height,
    gutter: 12,
    rows: 17,
    columns: 17,
});

const randomLines = (w, h, count) => {
    const lines = [
        [w / 2, 0, w / 2, h],
        [0, h / 2, w, h / 2],
        [0, 0, w, h],
        [w, 0, 0, h],
        [w / 2, 0, w, h / 2],
        [w, h / 2, w / 2, h],
        [w / 2, h, 0, h / 2],
        [0, h / 2, w / 2, 0],
    ];
    return shuffle(lines).slice(0, count);
};

const makeCell = (width, height, count) => {
    const group = r.group();
    const lines = randomLines(width, height, count);
    lines.forEach((points) =>
        r
            .line(...points, group)
            .stroke('#273469')
            .strokeWidth(0.5),
    );
    r.rect(0, 0, width, height, group)
        .fill('none')
        .stroke('#273469')
        .strokeWidth(0.5);
    return group;
};

const linear = (idx) => Math.ceil((idx - 1) / 2);
const outer = (row, col, rowCount) => {
    const mid = Math.ceil(rowCount / 2);
    return Math.max(Math.abs(row - mid), Math.abs(col - mid));
};
const inner = (row, col, rowCount) => {
    const mid = Math.floor(rowCount / 2);
    return mid - outer(row, col, rowCount);
};

forEachCell(grid, ({ row, col, w, h }) => {
    const lineCount = linear(row);
    // const lineCount = linear(col);
    // const lineCount = inner(row, col, grid.state.rows);
    // const lineCount = outer(row, col, grid.state.rows);
    return makeCell(w, h, lineCount);
});

r.draw();
