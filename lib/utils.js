/**
 * Invoke function `f` for each cell in a Rune.grid, and add the result to the grid.
 * @param g Rune.Grid
 * @param f callback function ({ row, col, w, h }) => cell
 */
const forEachCell = (g, f) => {
    const { rows, columns, moduleWidth, moduleHeight } = g.state;
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const cell = f({ row, col, w: moduleWidth, h: moduleHeight });
            if (cell) {
                g.add(cell, col, row);
            }
        }
    }
};

/** Select cells based on a predicate */
const pickCells = (g, f, predicate) =>
    forEachCell(g, ({ row, col, w, h }) => {
        return predicate(row, col) ? f({ row, col, w, h }) : null;
    });

/** Select random cells from a Rune.grid, with the ratio `r` (eg, 0.2 picks 20% of the cells, roughly). */
const randomCells = (g, f, r = 0.5) => pickCells(g, f, () => Math.random() < r);

/** Select only the odd cells (1, 3, 5, etc). Does a checkerboard. */
const oddCells = (g, f) => pickCells(g, f, (row, col) => !!((row + col) % 2));

/** Select only the even cells (2, 4, 6, etc). Does a checkerboard. */
const evenCells = (g, f) => pickCells(g, f, (row, col) => (row + col) % 2 === 0);

/** Select all the cells in row `n`. */
const row = (g, n, f) => {
    for (let col = 1; col <= g.state.columns; col++) {
        const cell = f({
            row: n,
            col,
            w: g.state.moduleWidth,
            h: g.state.moduleHeight,
        });
        g.add(cell, col, n);
    }
};

/** Select all the cells in column `n`. */
const column = (g, n, f) => {
    for (let row = 1; row <= g.state.rows; row++) {
        const cell = f({
            row,
            col: n,
            w: g.state.moduleWidth,
            h: g.state.moduleHeight,
        });
        g.add(cell, n, row);
    }
};

/** Randomly shuffle an array. Probably not efficient or uniform, but it's simple */
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

/** pick an item from the list with weighted probablility [p, value]. No error checking. */
const pick = (list) => {
    const weightTotal = list.reduce((total, item) => total + item[0], 0);
    let threshold = Math.random() * weightTotal;
    return list.find((item) => {
        threshold = threshold - item[0];
        return threshold <= 0;
    })[1];
};

/** Pick n random elements from the list */
const pickN = (n, list) => {
    const items = list.slice();
    return shuffle(items).slice(0, n);
};

/** Alternately pick a/b when i is even/odd */
const evenOdd = (a, b, i) => (i % 2 ? b : a);

/** Invert a value between 0-1.0 */
const invert = (val) => 1.0 - val;

/**
 * Convert an array of string options `['a', 'b', 'c']` into
 * an object `{a: 'a', b: 'b', c: 'c'}` for Tweakpane
 */
const optionsList = (labels) => {
    const opts = {};
    labels.forEach((x) => (opts[x] = x));
    return opts;
};

/** Some named colors. */
const colors = {
    tart_orange: '#F25757',
    gunmetal: '#2B303A',
    cornflower_blue: '#7189FF',
    gold_crayola: '#D7BE82',
    space_cadet: '#273469',
    international_orange: '#FF5714',
    lime_green: '#81B622',
    midnight_blue: '#145DA0',
    deep_blue: '#050A30',
    pale_yellow: '#FFF4BD',
    pewter: '#BCBEC0',
    slate: '#EAEDF0',
    forest_green: '#013A20',
    emerald_green: '#478C5C',
    white: '#FFFFFF',
    none: 'none',
};

/** Add a "background" color to rune plot */
const background = (rune, color) => {
    return rune.rect(0, 0, rune.width, rune.height).fill(color).stroke('none');
};
