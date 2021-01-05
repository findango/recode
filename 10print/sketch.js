// 10 PRINT CHR$(205.5+RND(1)); : GOTO 10

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

const slash = (width, height) => r.line(0, height, width, 0);
const backslash = (width, height) => r.line(0, 0, height, width);

const { rows, columns, moduleWidth, moduleHeight, width, height } = grid.state;

for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
        // leave some squares blank
        if (Math.random() > 0.1) {
            const line =
                Math.random() > 0.5
                    ? slash(moduleWidth, moduleHeight).strokeWidth(2)
                    : backslash(moduleWidth, moduleHeight).strokeWidth(2);
            grid.add(line, col, row);
        }
    }
}

r.draw();
