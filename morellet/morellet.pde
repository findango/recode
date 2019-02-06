// Repro of "Violet, Bleu, Vert, Jaune, Orange, Rouge" by François Morellet
// See: https://www.centrepompidou.fr/cpv/resource/cxx585o/ryjG5EL

int tile_size = 35;

color violet =  #601d48;
color bleu = #2571bc;
color vert = #44926b;
color jaune = #fbe34d;
color orange = #fc8b28;
color rouge = #df392d;

void setup() {
    // 16 rows and cols = 560px;
    size(560, 560);
    noLoop();
}

void draw() {
    background(#ffffff);

    int start_col = -10;
    for (int row = -2; row < 16; row += 3) {
        for(int col = start_col; col < 19; col += 10) {
            drawCross(row, col, violet);
            drawCross(row + 1, col + 2, vert);
            drawCross(row + 2, col + 4, orange);
            drawCross(row, col + 5, jaune);
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

void square(int x, int y, int extent) {
    rect(x, y, extent, extent);
}

void drawCross(int row, int col, color c) {
    noStroke();
    fill(c);

    int x = col * tile_size;
    int y = row * tile_size;

    square(x + tile_size, y, tile_size);
    square(x, y + tile_size, tile_size);
    square(x + tile_size, y + tile_size, tile_size);
    square(x + tile_size * 2, y + tile_size, tile_size);
    square(x + tile_size, y + tile_size * 2, tile_size);
}