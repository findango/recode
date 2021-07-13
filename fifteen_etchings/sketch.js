// Sol LeWitt
// Straight lines in four directions and all their possible combinations.

const width = 520;
const height = 520;
const margin = 40;

const color = '#273469';

// prettier-ignore
const tiles = [
    '',   'h',   'r',   'l',
    'v',  'vr',  'vl',  'hr',
    'rl', 'hv',  'hvr', 'hrl',
    'hl', 'vrl', 'hvl', 'hvrl'
];

const paths = {
    h: (w, h) => new Rune.Line(0, h / 2, w, h / 2),
    v: (w, h) => new Rune.Line(w / 2, 0, w / 2, h),
    r: (w, h) => new Rune.Line(0, h, w, 0),
    l: (w, h) => new Rune.Line(w, h, 0, 0),
};

const r = new Rune({
    container: '#sketch',
    width: width + 2 * margin,
    height: height + 2 * margin,
    debug: false,
});
background(r, 'white');

const grid = r.grid({
    x: margin,
    y: margin,
    width: width,
    height: height,
    rows: 4,
    columns: 4,
    gutter: 20,
});

forEachCell(grid, ({ row, col, w, h }) => {
    const i = (row - 1) * grid.state.columns + (col - 1);
    const g = new Rune.Group();
    tiles[i].split('').forEach((line) => {
        g.add(paths[line](w, h).stroke(color).strokeWidth(1));
    });
    if (tiles[i]) {
        g.add(new Rune.Rectangle(0, 0, w, h).fill('none').stroke(color).strokeWidth(2));
    }
    return g;
});

r.draw();
