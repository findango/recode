// Sol LeWitt
// Straight lines in four directions and all their possible combinations.

const width = 520;
const height = 520;
const margin = 40;

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
    rows: 4,
    columns: 4,
    gutter: 20,
});

// prettier-ignore
const squares = [
    '',   'h',   'r',   'l',
    'v',  'vr',  'vl',  'hr',
    'rl', 'hv',  'hvr', 'hrl',
    'hl', 'vrl', 'hvl', 'hvrl'
];

const tile = (w, h, lines = '') => {
    const color = '#273469';
    const g = new Rune.Group();
    lines.split('').forEach((l) => {
        if (l === 'h') {
            g.add(new Rune.Line(0, h / 2, w, h / 2).stroke(color));
        } else if (l === 'v') {
            g.add(new Rune.Line(w / 2, 0, w / 2, h).stroke(color));
        } else if (l === 'r') {
            g.add(new Rune.Line(0, h, w, 0).stroke(color));
        } else if (l === 'l') {
            g.add(new Rune.Line(w, h, 0, 0).stroke(color));
        }
    });
    if (lines) {
        g.add(
            new Rune.Rectangle(0, 0, w, h)
                .fill('none')
                .stroke(color)
                .strokeWidth(2),
        );
    }
    g.strokeWidth(1);

    return g;
};

const { rows, columns, moduleWidth, moduleHeight } = grid.state;
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        const t = r * columns + c;
        grid.add(tile(moduleWidth, moduleHeight, squares[t]), r + 1, c + 1);
    }
}

r.draw();
