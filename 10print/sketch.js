// 10 PRINT CHR$(205.5+RND(1)); : GOTO 10

const colors = {
    tart_orange: '#F25757',
    gunmetal: '#2B303A',
    cornflower_blue: '#7189FF',
    gold_crayola: '#D7BE82',
    space_cadet: '#273469',
    international_orange: '#FF5714',
};

const r = new Rune({
    container: 'body',
    width: 720,
    height: 720,
    debug: false,
});

const margin = 20;

const grid = r.grid({
    x: margin,
    y: margin,
    width: r.width - 2 * margin,
    height: r.height - 2 * margin,
    rows: 42,
    columns: 42,
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

const slash = (width, height) => r.line(0, height, width, 0);
const backslash = (width, height) => r.line(0, 0, height, width);
const bar = (width, height) => r.line(0, height, width, height);
const pipe = (width, height) => r.line(width, 0, width, height);
const plus = (width, height) =>
    new Rune.Path()
        .moveTo(width / 2, 0)
        .lineTo(width / 2, height)
        .moveTo(0, height / 2)
        .lineTo(width, height / 2);
const dot = (width, height) =>
    r.circle(width / 2, height / 2, 2).fill('#ffffff');

const { rows, columns, moduleWidth, moduleHeight, width, height } = grid.state;

for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
        const obj = pick([
            [0.1, null],
            [0.4, slash],
            [0.4, backslash],
            [0.1, dot],
        ]);
        if (obj) {
            grid.add(
                obj(moduleWidth, moduleHeight)
                    .strokeWidth(2)
                    .stroke(colors.tart_orange),
                col,
                row,
            );
        }
    }
}

r.draw();
