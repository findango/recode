//
// Some helper functions to pick cells in the Rune grid.
//

const pickCells = (g, f, predicate) => {
    const { rows, columns, moduleWidth, moduleHeight } = g.state;
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            if (predicate(row, col)) {
                g.add(
                    f({ row, col, w: moduleWidth, h: moduleHeight }),
                    col,
                    row,
                );
            }
        }
    }
};

const randomCells = (g, f, p = 0.5) => pickCells(g, f, () => Math.random() < p);

const oddCells = (g, f) =>
    pickCells(g, f, (row, col) => !!((row * g.state.columns + col) % 2));

const evenCells = (g, f) =>
    pickCells(g, f, (row, col) => (row * g.state.columns + col) % 2 === 0);
