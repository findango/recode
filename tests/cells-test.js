const width = 200;
const height = 200;
const margin = 10;

const sketch = (container) => {
    const r = new Rune({
        container,
        width: width + margin * 2,
        height: height + margin * 2,
    });

    const grid = r.grid({
        x: margin,
        y: margin,
        width: width,
        height: height,
        rows: 7,
        columns: 7,
        gutter: 0,
    });

    return { r, grid };
};

const sketch1 = sketch('#random');
randomCells(
    sketch1.grid,
    ({ row, w, h }) => {
        const hue = 200 - 4 * row;
        return new Rune.Rectangle(0, 0, w, h)
            .fill('hsv', hue, 70, 68)
            .stroke('none');
    },
    0.5,
);
sketch1.r.draw();

const sketch2 = sketch('#odd');
oddCells(sketch2.grid, ({ row, w, h }) => {
    const hue = 200 - 4 * row;
    return new Rune.Rectangle(0, 0, w, h)
        .fill('hsv', hue, 70, 68)
        .stroke('none');
});
sketch2.r.draw();

const sketch3 = sketch('#even');
evenCells(sketch3.grid, ({ row, w, h }) => {
    const hue = 200 - 4 * row;
    return new Rune.Rectangle(0, 0, w, h)
        .fill('hsv', hue, 70, 68)
        .stroke('none');
});
sketch3.r.draw();

const sketch4 = sketch('#rows');
row(sketch4.grid, 2, ({ row, w, h }) => {
    const hue = 200 - 4 * row;
    return new Rune.Rectangle(0, 0, w, h)
        .fill('hsv', hue, 70, 68)
        .stroke('none');
});
sketch4.r.draw();

const sketch5 = sketch('#columns');
column(sketch5.grid, 5, ({ row, w, h }) => {
    const hue = 200 - 4 * row;
    return new Rune.Rectangle(0, 0, w, h)
        .fill('hsv', hue, 70, 68)
        .stroke('none');
});
sketch5.r.draw();
