// Repro of "Violet, Bleu, Vert, Jaune, Orange, Rouge" by François Morellet
// See: https://www.centrepompidou.fr/cpv/resource/cxx585o/ryjG5EL

color violet = #601d48;
color bleu = #2571bc;
color vert = #44926b;
color jaune = #fbe34d;
color orange = #fc8b28;
color rouge = #df392d;

int tile_size = 35;

void setup() {
    // 35 x 16 rows and cols = 560px;
    size(560, 560);
    noLoop();
}

void draw() {
    background(#ffffff);

    int start_col = -10;
    for (int row = -2; row < 16; row += 3) {
        for(int col = start_col; col < 16; col += 10) {
            drawCross(row,     col,     violet);
            drawCross(row + 1, col + 2, vert);
            drawCross(row + 2, col + 4, orange);
            drawCross(row,     col + 5, jaune);
            drawCross(row + 1, col + 7, rouge);
            drawCross(row + 2, col + 9, bleu);
        }
        start_col -= 4;
    }
}

void keyPressed() {
    if (key == ' ') {
        redraw();
    } else if (key == 's' || key == 'S') {
        save("out.png");
    }
}

void drawCross(int row, int col, color c) {
    int top = row * tile_size;
    int left = col * tile_size;
    int center = left + tile_size;
    int middle = top + tile_size;
    noStroke();
    fill(c);
    rect(center, top, tile_size, tile_size * 3);
    rect(left, middle, tile_size * 3, tile_size);
}
