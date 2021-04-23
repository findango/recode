// Truchet Tiles
// https://en.wikipedia.org/wiki/Truchet_tiles

const width = 720;
const height = 960;
const margin = 40;

const oneLine = (w, h) => {
    const angle = Math.random() < 0.5 ? 0 : 90;
    const g = new Rune.Group();
    g.add(new Rune.Line(0, h / 2, w, h / 2).stroke(false));
    g.rotate(angle, w / 2, h / 2);
    return g;
};

const oneCorner = (w, h) => {
    const angle = pick([
        [1, 0],
        [1, 90],
        [1, 180],
        [1, 270],
    ]);
    const g = new Rune.Group();
    g.add(
        new Rune.Path(0, 0, g)
            .moveTo(w / 2, 0)
            .curveTo(w / 2, h / 2, w, h / 2)
            .fill('none')
            .stroke(false),
    );
    g.rotate(angle, w / 2, h / 2);
    return g;
};

const cross = (w, h) => {
    const g = new Rune.Group();
    g.add(new Rune.Line(0, h * -0.15, 0, h * 0.15).stroke(false));
    g.add(new Rune.Line(w * -0.15, 0, w * 0.15, 0).stroke(false));
    return g;
};

const sketchDiv = document.getElementById('sketch').getBoundingClientRect();
const settings = QuickSettings.create(
    sketchDiv.left + width + 2 * margin + 40,
    sketchDiv.top,
    'Settings',
);

const render = () => {
    Math.seedrandom(settings.getValue('Seed').trim(), { global: true });

    document.getElementById('sketch').innerHTML = '';
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
        rows: settings.getValue('Grid'),
        columns: Math.floor(settings.getValue('Grid') * 0.75),
    });

    const stroke = colors[settings.getValue('Stroke Color').value];
    const strokeWidth = settings.getValue('Stroke Width');
    const tiles = [
        [1, oneLine],
        [1, oneCorner],
    ];

    forEachCell(grid, ({ row, col, w, h }) => {
        if (row > 1 && col > 1 && row % 2 && col % 2) {
            return cross(w, h).stroke(colors.gold_crayola).strokeWidth(1).strokeCap('round');
        }
    });

    forEachCell(grid, ({ w, h }) => {
        const tile = pick(tiles);
        if (tile) {
            return tile(w, h)
                .stroke(colors.emerald_green)
                .strokeWidth(strokeWidth)
                .strokeCap('round');
        }
    });

    r.draw();
};

settings
    .setGlobalChangeHandler(render)
    .addText('Seed', '12345')
    .addRange('Grid', 3, 75, 28, 1)
    .addRange('Stroke Width', 0.5, 25, 1.5, 0.5)
    .addDropDown('Stroke Color', Object.keys(colors))
    .addDropDown('Background Color', Object.keys(colors), (c) => {
        document.getElementById('sketch').style.backgroundColor = colors[c.value] || '#ffffff';
    });

// FIXME not ideal
settings.setValue('Background Color', Object.keys(colors).indexOf('white'));

render();
