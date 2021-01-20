const colors = {
    tart_orange: '#F25757',
    gunmetal: '#2B303A',
    cornflower_blue: '#7189FF',
    gold_crayola: '#D7BE82',
    space_cadet: '#273469',
    international_orange: '#FF5714',
};

const width = 520;
const height = 520;
const margin = 40;

const r = new Rune({
    container: 'body',
    width: width + margin * 2,
    height: height + margin * 2,
    debug: false,
});

r.rect(0, 0, width + 2 * margin, height + 2 * margin).fill('#050A30');

const grid = r.grid({
    x: margin,
    y: margin,
    width: width,
    height: height,
    rows: 24,
    columns: 24,
    gutter: 0,
});

const w = grid.state.moduleWidth;
const h = grid.state.moduleHeight;

randomCells(
    grid,
    ({ row }) => {
        const hue = 200 - 4 * row;
        return r
            .rect(0, 0, w, h)
            .stroke('hsv', hue, 70, 68)
            .strokeWidth(0.5)
            .fill('none');
    },
    0.2,
);
randomCells(
    grid,
    ({ row }) => {
        const hue = 40 + 4 * row;
        return r
            .rect(0, 0, w, h)
            .stroke('hsv', hue, 70, 68)
            .fill('hsv', hue, 70, 68);
    },
    0.2,
);

r.draw();
