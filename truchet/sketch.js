// Truchet Tiles
// https://en.wikipedia.org/wiki/Truchet_tiles

const colors = {
    tart_orange: '#F25757',
    gunmetal: '#2B303A',
    cornflower_blue: '#7189FF',
    gold_crayola: '#D7BE82',
    space_cadet: '#273469',
    international_orange: '#FF5714',
    lime_green: '#81B622',
    midnight_blue: '#145DA0',
};

const width = 720;
const height = 720;
const margin = 40;

// pick an item from the list with weighted probablility [p, value]. No error checking.
const pick = (list) => {
    const weightTotal = list.reduce((total, item) => total + item[0], 0);
    let threshold = Math.random() * weightTotal;
    return list.find((item) => {
        threshold = threshold - item[0];
        return threshold <= 0;
    })[1];
};

// A simple cross
const cross = (w, h) => {
    const g = new Rune.Group();
    g.add(new Rune.Line(w / 2, 0, w / 2, h).stroke(false));
    g.add(new Rune.Line(0, h / 2, w, h / 2).stroke(false));
    return g;
};

const crossUnder = (w, h) => {
    const g = new Rune.Group();
    g.add(new Rune.Line(w / 2, 0, w / 2, h).stroke(false));
    g.add(new Rune.Line(0, h / 2, w / 2 - 5, h / 2).stroke(false));
    g.add(new Rune.Line(w, h / 2, w / 2 + 5, h / 2).stroke(false));
    return g;
};

const crossOver = (w, h) => crossUnder(w, h).rotate(90, w / 2, h / 2);

// Semi-circles in the top-right and bottom-left
const cornersA = (w, h) => {
    const g = new Rune.Group();
    g.add(
        new Rune.Path(0, 0, g)
            .moveTo(w / 2, 0)
            .curveTo(w / 2, h / 2, w, h / 2)
            .fill('none')
            .stroke(false),
    );
    g.add(
        new Rune.Path(0, 0, g)
            .moveTo(0, h / 2)
            .curveTo(w / 2, h / 2, w / 2, h)
            .fill('none')
            .stroke(false),
    );
    return g;
};

// Just a 90 degree rotation of cornersA
const cornersB = (w, h) => cornersA(w, h).rotate(90, w / 2, h / 2);

const sketchDiv = document.getElementById('sketch').getBoundingClientRect();
const settings = QuickSettings.create(
    sketchDiv.left + width + 2 * margin + 40,
    sketchDiv.top,
    'Settings',
);

const render = () => {
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
        columns: settings.getValue('Grid'),
    });

    const { rows, columns, moduleWidth, moduleHeight } = grid.state;
    const stroke = colors[settings.getValue('Color').value];
    const strokeWidth = settings.getValue('StrokeWidth');
    const tiles = [
        [3, cornersA],
        [3, cornersB],
        [1, cross],
        [0.5, crossUnder],
        [0.5, crossOver],
    ];

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const tile = pick(tiles);
            if (tile) {
                grid.add(
                    tile(moduleWidth, moduleHeight)
                        .stroke(stroke)
                        .strokeWidth(strokeWidth),
                    col,
                    row,
                );
            }
        }
    }

    r.draw();
};

settings
    .setGlobalChangeHandler(render)
    .addText('Seed', '12345')
    .addRange('Grid', 3, 75, 28, 1)
    .addRange('StrokeWidth', 0.5, 25, 1.5, 0.5)
    .addDropDown('Color', Object.keys(colors));

render();
