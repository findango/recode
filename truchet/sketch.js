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
    rows: 28,
    columns: 28,
});

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
    const g = r.group();
    r.line(w / 2, 0, w / 2, h, g).stroke(false);
    r.line(0, h / 2, w, h / 2, g).stroke(false);
    return g;
};

const crossUnder = (w, h) => {
    const g = r.group();
    r.line(w / 2, 0, w / 2, h, g).stroke(false);
    r.line(0, h / 2, w / 2 - 5, h / 2, g).stroke(false);
    r.line(w, h / 2, w / 2 + 5, h / 2, g).stroke(false);
    return g;
};

const crossOver = (w, h) => crossUnder(w, h).rotate(90, w / 2, h / 2);

// Semi-circles in the top-right and bottom-left
const cornersA = (w, h) => {
    const g = r.group();
    r.path(0, 0, g)
        .moveTo(w / 2, 0)
        .curveTo(w / 2, h / 2, w, h / 2)
        .fill('none')
        .stroke(false);
    r.path(0, 0, g)
        .moveTo(0, h / 2)
        .curveTo(w / 2, h / 2, w / 2, h)
        .fill('none')
        .stroke(false);
    return g;
};

// Just a 90 degree rotation of cornersA
const cornersB = (w, h) => cornersA(w, h).rotate(90, w / 2, h / 2);

const { rows, columns, moduleWidth, moduleHeight } = grid.state;

for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
        const obj = pick([
            [3, cornersA],
            [3, cornersB],
            [1, cross],
            [0.5, crossUnder],
            [0.5, crossOver],
        ]);
        if (obj) {
            grid.add(
                obj(moduleWidth, moduleHeight)
                    .stroke(colors.international_orange)
                    .strokeWidth(1.5),
                col,
                row,
            );
        }
    }
}

r.draw();
