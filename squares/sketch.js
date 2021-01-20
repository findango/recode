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
    rows: 16,
    columns: 16,
});

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

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
            .strokeWidth(0.75),
    );
    r.rect(0, 0, width, height, group)
        .fill('none')
        .stroke('#273469')
        .strokeWidth(1);
    return group;
};

forEachCell(grid, ({ row, w, h }) => {
    return makeCell(w, h, Math.ceil((row - 1) / 2));
});

r.draw();
