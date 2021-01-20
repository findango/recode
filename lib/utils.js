//
// Some helper functions to pick cells from a Rune grid
//

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

const pickCells = (g, f, predicate) =>
    forEachCell(g, ({ row, col, w, h }) => {
        return predicate(row, col) ? f({ row, col, w, h }) : null;
    });

const randomCells = (g, f, r = 0.5) => pickCells(g, f, () => Math.random() < r);

const oddCells = (g, f) => pickCells(g, f, (row, col) => !!((row + col) % 2));

const evenCells = (g, f) =>
    pickCells(g, f, (row, col) => (row + col) % 2 === 0);

const row = (g, n, f) => {
    for (let col = 1; col <= g.state.columns; col++) {
        g.add(f({ row: n, col }), col, n);
    }
};

const column = (g, n, f) => {
    for (let row = 1; row <= g.state.rows; row++) {
        g.add(f({ row, col: n }), n, row);
    }
};
