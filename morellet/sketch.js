// Repro of "Violet, Bleu, Vert, Jaune, Orange, Rouge" by François Morellet
// See: https://www.centrepompidou.fr/cpv/resource/cxx585o/ryjG5EL

const violet = '#601d48';
const bleu = '#2571bc';
const vert = '#44926b';
const jaune = '#fbe34d';
const orange = '#fc8b28';
const rouge = '#df392d';

const tile = 35;

function drawCross(row, col, color) {
    noStroke();
    fill(color);
    // vertical bar
    rect((col + 1) * tile, row * tile, tile, tile * 3);
    // horizontal bar
    rect(col * tile, (row + 1) * tile, tile * 3, tile);
}

function setup() {
    // 35 x 16 rows and cols = 560px
    createCanvas(560, 560);
    noLoop();
}

function draw() {
    background('#ffffff');

    let start_col = -10;
    for (let row = -2; row < 16; row += 3) {
        for (let col = start_col; col < 16; col += 10) {
            drawCross(row + 0, col + 0, violet);
            drawCross(row + 1, col + 2, vert);
            drawCross(row + 2, col + 4, orange);
            drawCross(row + 0, col + 5, jaune);
            drawCross(row + 1, col + 7, rouge);
            drawCross(row + 2, col + 9, bleu);
        }
        start_col -= 4;
    }
}
