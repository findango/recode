// Truchet Tiles
// https://en.wikipedia.org/wiki/Truchet_tiles

const width = 720;
const height = 960;
const margin = 60;

const line = (w, h) => {
    return new Rune.Line(w, 0, w, h).stroke(false).strokeCap('square');
};

const lines = (w, h, count = 4) => {
    const g = new Rune.Group();
    for (let i = 0; i <= count; i++) {
        const l = line((w * i) / count, h);
        g.add(l);
    }
    return g;
};

const corner = (w, h) => {
    return new Rune.Path(0, 0)
        .moveTo(w, 0)
        .curveTo(w, h, 0, h)
        .fill('none')
        .stroke(false)
        .strokeCap('square');
};

const corners = (w, h, count = 4) => {
    const g = new Rune.Group();
    for (let i = 1; i <= count; i++) {
        const c = corner((w * i) / count, (h * i) / count);
        g.add(c);
    }
    for (let j = 1; j <= Math.floor(count / 3); j++) {
        const miniCorner = corner((j * w) / count, (j * h) / count).rotate(180, w / 2, h / 2);
        g.add(miniCorner);
    }
    return g;
};

const cross = (w, h) => {
    const g = new Rune.Group();
    g.add(new Rune.Line(0, h * -0.15, 0, h * 0.15).stroke(false));
    g.add(new Rune.Line(w * -0.15, 0, w * 0.15, 0).stroke(false));
    return g;
};

const diamond = (w, h) => {
    const g = new Rune.Group();
    g.add(
        new Rune.Rectangle(w * -0.25, h * -0.25, w * 0.25, h * 0.25)
            .stroke(false)
            .fill('none')
            .rotate(45, 0, 0),
    );
    return g;
};

// Different distributions of tile types across the grid.
const distributions = {
    random: () =>
        pick([
            [0.5, lines],
            [0.5, corners],
        ]),
    vertical: ({ row, rows }) => {
        const y = row / rows;
        return pick([
            [invert(d3.easeQuadInOut(y)), lines],
            [d3.easeQuadInOut(y), corners],
        ]);
    },
    horizontal: ({ col, columns }) => {
        const x = col / columns;
        return pick([
            [invert(d3.easeQuadInOut(x)), lines],
            [d3.easeQuadInOut(x), corners],
        ]);
    },
    radial: ({ row, col, rows, columns }) => {
        const r = (Math.min(rows, columns) * 0.8) / 2;
        const cx = columns / 2 + 0.5;
        const cy = rows / 2 + 0.5;
        const dist = Math.hypot(cx - col, cy - row);
        return dist < r ? corners : lines;
    },
};

let seed;
let r;
const render = () => {
    seed = settings.getValue('Seed').trim();
    Math.seedrandom(seed, { global: true });

    document.getElementById('sketch').innerHTML = '';
    r = new Rune({
        container: '#sketch',
        width: width + 2 * margin,
        height: height + 2 * margin,
        debug: false,
    });

    r.rect(0, 0, r.width, r.height)
        .stroke('none')
        .fill(colors[settings.getValue('Background Color').value]);

    const grid = r.grid({
        x: margin,
        y: margin,
        width: width,
        height: height,
        rows: settings.getValue('Grid'),
        columns: Math.floor(settings.getValue('Grid') * 0.75),
    });

    const stroke = colors[settings.getValue('Stroke Color').value];
    const strokeWidth = settings.getValue('Stroke Width');
    const pickTileConstrained = distributions[settings.getValue('Distribution').value];

    forEachCell(grid, ({ row, col, w, h }) => {
        const tile = pickTileConstrained({
            row,
            col,
            rows: grid.state.rows,
            columns: grid.state.columns,
        });
        const angle = pick([
            [1, 0],
            [1, 90],
            [1, 180],
            [1, 270],
        ]);
        if (tile) {
            return tile(w, h, settings.getValue('Density'))
                .stroke(stroke)
                .strokeWidth(strokeWidth)
                .rotate(angle, w / 2, h / 2);
        }
    });

    if (settings.getValue('Ornament Color').value !== 'none') {
        randomCells(grid, ({ row, col, w, h }) => {
            if (row > 1 && col > 1 && row % 2 && col % 2) {
                return cross(w, h)
                    .stroke(colors[settings.getValue('Ornament Color').value])
                    .strokeWidth(strokeWidth)
                    .strokeCap('butt');
            }
        });
    }

    r.draw();
};

const sketchDiv = document.getElementById('sketch').getBoundingClientRect();
const settings = QuickSettings.create(
    sketchDiv.left + width + 2 * margin + 40,
    sketchDiv.top,
    'Settings',
)
    .setGlobalChangeHandler(render)
    .addText('Seed', new Date().format('yyyymmdd'))
    .addRange('Grid', 4, 60, 24, 4)
    .addRange('Stroke Width', 0.5, 25, 1.5, 0.5)
    .addRange('Density', 1, 12, 4)
    .addDropDown('Distribution', Object.keys(distributions))
    .addDropDown('Stroke Color', Object.keys(colors))
    .addDropDown('Background Color', Object.keys(colors))
    .addDropDown('Ornament Color', Object.keys(colors))
    .addButton('Save file', () => {
        r.save(`truchet-${seed}.svg`);
    });

// defaults
settings
    .setValue('Stroke Color', Object.keys(colors).indexOf('emerald_green'))
    .setValue('Background Color', Object.keys(colors).indexOf('forest_green'))
    .setValue('Ornament Color', Object.keys(colors).indexOf('none'))
    .setValue('Distribution', Object.keys(distributions).indexOf('random'));

try {
    settings.saveInLocalStorage('truchet5');
} catch (error) {
    // maybe clean up
}

render();
