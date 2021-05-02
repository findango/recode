// Truchet Tiles
// https://en.wikipedia.org/wiki/Truchet_tiles

const width = 720;
const height = 900;
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

const settings = {
    seed: new Date().format('yyyymmdd'),
    grid: 24,
    density: 4,
    distribution: 'random',
    multiScale: true,
    strokeWidth: 1.5,
    strokeColor: colors.gunmetal,
    backgroundColor: colors.slate,
    format: 'svg',
};

let r;
const render = () => {
    Math.seedrandom(settings.seed.trim(), { global: true });

    document.getElementById('sketch').innerHTML = '';
    r = new Rune({
        container: '#sketch',
        width: width + 2 * margin,
        height: height + 2 * margin,
        debug: false,
    });

    r.rect(0, 0, r.width, r.height).stroke('none').fill(settings.backgroundColor);

    const grid = r.grid({
        x: margin,
        y: margin,
        width: width,
        height: height,
        columns: settings.grid,
        rows: (settings.grid * 5) / 4,
    });

    const bigGrid = r.grid({
        x: margin,
        y: margin,
        width: width,
        height: height,
        columns: grid.state.columns / 4,
        rows: grid.state.rows / 4,
    });

    const pickTileConstrained = distributions[settings.distribution];

    if (settings.multiScale) {
        randomCells(bigGrid, ({ row, col, w, h }) => {
            const tile = pickTileConstrained({
                row,
                col,
                rows: bigGrid.state.rows,
                columns: bigGrid.state.columns,
            });
            const angle = pick([
                [1, 0],
                [1, 90],
                [1, 180],
                [1, 270],
            ]);
            if (tile) {
                return tile(w, h, settings.density * 4)
                    .stroke(settings.strokeColor)
                    .strokeWidth(settings.strokeWidth)
                    .rotate(angle, w / 2, h / 2);
            }
        });
    }

    forEachCell(grid, ({ row, col, w, h }) => {
        if (settings.multiScale) {
            const bigCell = bigGrid.getModule(Math.ceil(col / 4), Math.ceil(row / 4));
            if (bigCell.children.length > 0) return;
        }
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
            return tile(w, h, settings.density)
                .stroke(settings.strokeColor)
                .strokeWidth(settings.strokeWidth)
                .rotate(angle, w / 2, h / 2);
        }
    });

    r.draw();
};

const pane = new Tweakpane({
    container: document.getElementById('controls'),
});

pane.addInput(settings, 'seed', { input: 'string' });
pane.addInput(settings, 'grid', { min: 4, max: 36, step: 4 });
pane.addInput(settings, 'density', { min: 1, max: 12, step: 1 });
pane.addInput(settings, 'multiScale', { label: 'multi-scale?' });
pane.addInput(settings, 'distribution', {
    options: optionsList(Object.keys(distributions)),
});

pane.addSeparator();
pane.addInput(settings, 'strokeWidth', { min: 0.5, max: 15, step: 0.5 });
pane.addInput(settings, 'strokeColor', { picker: 'inline' });
pane.addInput(settings, 'backgroundColor', { label: 'background', picker: 'inline' });
pane.addButton({ label: '', title: 'Swap colors' }).on('click', () => {
    const tmp = settings.strokeColor;
    settings.strokeColor = settings.backgroundColor;
    settings.backgroundColor = tmp;
    pane.refresh();
});

pane.addSeparator();
pane.addInput(settings, 'format', {
    options: optionsList(['svg', 'png', 'jpg']),
});
pane.addButton({ label: '', title: 'Save' }).on('click', () => {
    r.save(`truchet-${settings.seed}.${settings.format}`);
});

pane.on('change', render);

render();
